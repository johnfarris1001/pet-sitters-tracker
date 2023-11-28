import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { List, Divider, Table } from "semantic-ui-react";
import IndividualAppointments from "./IndividualAppointments";

function Sitter() {
    const [sitter, setSitter] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetch(`/sitters/${params.id}`)
            .then((r) => r.json())
            .then((data) => setSitter(data));
    }, [params]);

    function removeAppointment(id) {
        const newAppointments = sitter.appointments.filter((app) => {
            return app.id !== id;
        });
        setSitter({ ...sitter, appointments: newAppointments });
    }

    const style = { width: "80%", margin: "auto", padding: "20px" };

    console.log(sitter);
    const petsToDisplay = sitter
        ? sitter.unique_pets.map((pet) => {
              return (
                  <Table.Row key={pet.id}>
                      <Table.Cell>{pet.name}</Table.Cell>
                      <Table.Cell>{pet.species}</Table.Cell>
                      <Table.Cell>{pet.breed}</Table.Cell>
                      <Table.Cell>{pet.weight}</Table.Cell>
                      <Table.Cell>{pet.age}</Table.Cell>
                      <Table.Cell>{pet.notes}</Table.Cell>
                  </Table.Row>
              );
          })
        : null;

    if (!sitter) {
        return <div>Loading...</div>;
    } else if (sitter.error) {
        return <div>{sitter.error}</div>;
    } else {
        return (
            <div>
                <h2>{sitter.name}</h2>
                <List>
                    <List.Item>
                        <List.Description>
                            Yard At Home:{" "}
                            {sitter.has_home_with_yard ? "Yes" : "No"}
                        </List.Description>
                        <List.Description>
                            Phone Number: {sitter.phone_number}
                        </List.Description>
                        <List.Description>
                            Address: {sitter.address}
                        </List.Description>
                        <List.Description>
                            Dogs: {sitter.own_dogs}
                        </List.Description>
                        <List.Description>
                            Cats: {sitter.own_cats}
                        </List.Description>
                    </List.Item>
                </List>
                <Divider />
                <Table celled structured style={style}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Species</Table.HeaderCell>
                            <Table.HeaderCell>Breed</Table.HeaderCell>
                            <Table.HeaderCell>Weight</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Notes</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{petsToDisplay}</Table.Body>
                </Table>
                <Divider />
                <h3>{sitter.name}'s Appointments: </h3>
                <IndividualAppointments
                    individual={sitter}
                    removeAppointment={removeAppointment}
                />
                <Divider />
                <NavLink
                    className="ui button"
                    to="/sitters"
                    style={{ padding: "10px" }}
                >
                    Back to Sitters
                </NavLink>
                <NavLink
                    className="ui button"
                    to="/pets"
                    style={{ padding: "10px" }}
                >
                    Back to Pets
                </NavLink>
            </div>
        );
    }
}

export default Sitter;
