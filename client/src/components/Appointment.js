import { useState } from "react";
import { Table, Button } from "semantic-ui-react";

function Appointment({ appointment }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    function handleDelete() {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        // fetch(`${server}/plants/${plant.id}`, {
        //     method: "DELETE",
        // })
        //     .then((r) => r.json())
        //     .then(() => removePlant(plant));
    }

    function handleUpdate() {
        if (!showUpdate) {
            setShowUpdate(true);
            return;
        }
        // fetch(`${server}/plants/${plant.id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         name: updateInfo.name,
        //         variety: updateInfo.variety,
        //     }),
        // })
        //     .then((r) => r.json())
        //     .then((data) => updatePlant(data));
        setShowUpdate(false);
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
                <Button onClick={handleUpdate}>
                    {showUpdate ? "Submit" : "Update"}
                </Button>
                <Button onClick={handleDelete}>
                    {confirmDelete ? "Confirm Delete" : "Delete"}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

export default Appointment;
