import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Appointment from "./Appointment";

import { Table } from "semantic-ui-react";

function Appointments() {
    const { user } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch("/appointments")
            .then((resp) => resp.json())
            .then((data) => setAppointments(data));
    }, [setAppointments]);

    const title = user
        ? `${user.username}'s Appointments`
        : "Log in to view Appointments";

    const style = user ? { width: "80%", margin: "auto" } : { display: "none" };

    const appointmentsToDisplay = user
        ? appointments.map((appointment) => {
              return (
                  <Appointment key={appointment.id} appointment={appointment} />
              );
          })
        : null;

    return (
        <div>
            <h2>{title}</h2>
            <Table celled structured style={style}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Pet</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Sitter</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Repeat Days</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{appointmentsToDisplay}</Table.Body>
            </Table>
        </div>
    );
}

export default Appointments;
