import { Table } from "semantic-ui-react";

function Appointment({ appointment }) {
    return (
        <Table.Row>
            <Table.Cell>{appointment.pet.name}</Table.Cell>
            <Table.Cell>{appointment.category}</Table.Cell>
            <Table.Cell>{appointment.sitter.name}</Table.Cell>
            <Table.Cell>{appointment.start_date}</Table.Cell>
            <Table.Cell>{appointment.days}</Table.Cell>
            <Table.Cell>{appointment.notes}</Table.Cell>
        </Table.Row>
    );
}

export default Appointment;
