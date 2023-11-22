import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import { UserContext } from "../contexts/UserContext";

function Appointment({ appointment, removeAppointment }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(true);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.id !== appointment.pet.user_id) {
            setShowEditDeleteButtons(false);
        }
    }, [user, appointment]);

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
                <Button
                    onClick={handleUpdateClick}
                    style={showEditDeleteButtons ? {} : { display: "none" }}
                >
                    Edit
                </Button>
                <Button
                    onClick={handleDelete}
                    style={showEditDeleteButtons ? {} : { display: "none" }}
                >
                    {confirmDelete ? "Confirm Delete" : "Delete"}
                </Button>
                <p style={showEditDeleteButtons ? { display: "none" } : {}}>
                    Must be Pet Owner to Edit or Delete Appointments
                </p>
            </Table.Cell>
        </Table.Row>
    );
}

export default Appointment;
