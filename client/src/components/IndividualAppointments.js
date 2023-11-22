import { Table } from "semantic-ui-react";
import Appointment from "./Appointment";

function IndividualAppointments({ individual }) {
    const appointmentsToDisplay = individual.appointments
        ? individual.appointments.map((app) => {
              return <Appointment key={app.id} appointment={app} />;
          })
        : null;

    return (
        <Table celled structured style={{ width: "80%", margin: "auto" }}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Pet</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Sitter</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Repeat Days</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.HeaderCell>Update/Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>{appointmentsToDisplay}</Table.Body>
        </Table>
    );
}

export default IndividualAppointments;
