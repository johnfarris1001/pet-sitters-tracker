import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";

function Appointment({ appointment, removeAppointment }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    function handleDelete() {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        fetch(`/appointments/${appointment.id}`, {
            method: "DELETE",
        }).then(() => removeAppointment(appointment.id));
    }

    function handleUpdateClick() {
        navigate(`/appointments/${appointment.id}/edit`);
    }

    return (
        <Table.Row>
            <Table.Cell>{appointment.pet.name}</Table.Cell>
            <Table.Cell>{appointment.category}</Table.Cell>
            <Table.Cell>{appointment.sitter.name}</Table.Cell>
            <Table.Cell>{appointment.start_date}</Table.Cell>
            <Table.Cell>{appointment.days}</Table.Cell>
            <Table.Cell>{appointment.notes}</Table.Cell>
            <Table.Cell>
                <Button onClick={handleUpdateClick}>Edit</Button>
                <Button onClick={handleDelete}>
                    {confirmDelete ? "Confirm Delete" : "Delete"}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

export default Appointment;
