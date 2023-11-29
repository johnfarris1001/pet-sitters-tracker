import { useState, useEffect } from "react";
import {
    useParams,
    useNavigate,
    useLocation,
    NavLink,
    Outlet,
} from "react-router-dom";
import { List, Divider, Table } from "semantic-ui-react";
import IndividualAppointments from "./IndividualAppointments";

function Pet() {
    const [pet, setPet] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch(`/pets/${params.id}`)
            .then((r) => r.json())
            .then((data) => setPet(data));
    }, []);

    function removeAppointment(id) {
        const newAppointments = pet.appointments.filter((app) => {
            return app.id !== id;
        });
        const newUniqueSitters = pet.unique_sitters.filter((sitter) => {
            return newAppointments.some((app) => app.sitter.id === sitter.id);
        });
        setPet({
            ...pet,
            unique_sitters: newUniqueSitters,
            appointments: newAppointments,
        });
    }

    const addAppoinment = (appointment) => {
        const newAppointments = [...pet.appointments, appointment];
        const newUniqueSitters = pet.unique_sitters.filter((sitter) => {
            return sitter.id !== appointment.sitter.id;
        });
        setPet({
            ...pet,
            unique_sitters: [...newUniqueSitters, appointment.sitter],
            appointments: newAppointments,
        });
    };

    const editAppointment = (appointment) => {
        const newAppointments = pet.appointments.map((app) => {
            if (appointment.id === app.id) {
                return appointment;
            } else {
                return app;
            }
        });
        const newUniqueSitters = pet.unique_sitters
            .filter((sitter) => {
                return newAppointments.some(
                    (app) => app.sitter.id === sitter.id
                );
            })
            .filter((sitter) => {
                return sitter.id !== appointment.sitter.id;
            });
        setPet({
            ...pet,
            unique_sitters: [...newUniqueSitters, appointment.sitter],
            appointments: newAppointments,
        });
    };

    const categoryOptions = [
        { key: "1", text: "Drop-in 1/2-hr", value: "Drop-in 1/2-hr" },
        { key: "2", text: "Drop-in 1-hr", value: "Drop-in 1-hr" },
        { key: "3", text: "House Sit", value: "House Sit" },
        { key: "4", text: "Walk 1/2-hr", value: "Walk 1/2-hr" },
        { key: "5", text: "Walk 1-hr", value: "Walk 1-hr" },
        { key: "6", text: "Boarding", value: "Boarding" },
        { key: "7", text: "Grooming", value: "Grooming" },
        { key: "8", text: "Play Date", value: "Play Date" },
    ];

    const style = { width: "80%", margin: "auto", padding: "20px" };

    const newAppointmentLinkStyle =
        location.pathname === `/pets/${params.id}/appointments/new`
            ? { display: "none" }
            : { padding: "10px" };

    const sittersToDisplay = pet
        ? pet.unique_sitters.map((sitter) => {
              return (
                  <Table.Row
                      key={sitter.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/sitters/${sitter.id}`)}
                  >
                      <Table.Cell>{sitter.name}</Table.Cell>
                      <Table.Cell>
                          {sitter.has_home_with_yard ? "Yes" : "No"}
                      </Table.Cell>
                      <Table.Cell>{sitter.phone_number}</Table.Cell>
                      <Table.Cell>{sitter.address}</Table.Cell>
                      <Table.Cell>{sitter.own_dogs}</Table.Cell>
                      <Table.Cell>{sitter.own_cats}</Table.Cell>
                  </Table.Row>
              );
          })
        : null;

    if (!pet) {
        return <div>Loading...</div>;
    } else if (pet.error) {
        return <div>{pet.error}</div>;
    } else {
        return (
            <div>
                <h2>
                    {pet.name} the {pet.species}
                </h2>
                <List>
                    <List.Item>
                        <List.Header>Breed: {pet.breed}</List.Header>
                        <List.Description>Age: {pet.age}</List.Description>
                        <List.Description>
                            Weight: {pet.weight}
                        </List.Description>
                        <List.Description>Notes: {pet.notes}</List.Description>
                    </List.Item>
                </List>
                <Table celled structured style={style}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Yard At Home?</Table.HeaderCell>
                            <Table.HeaderCell>Phone Number</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Owned Dogs</Table.HeaderCell>
                            <Table.HeaderCell>Owned Cats</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{sittersToDisplay}</Table.Body>
                </Table>
                <Divider />
                <Outlet
                    context={{
                        pet: pet,
                        appointments: pet.appointments,
                        categoryOptions: categoryOptions,
                        addAppointment: addAppoinment,
                        editAppointment: editAppointment,
                    }}
                />
                <h3>{pet.name}'s Appointments:</h3>
                <IndividualAppointments
                    individual={pet}
                    removeAppointment={removeAppointment}
                />
                <Divider />
                <NavLink
                    className="ui button"
                    to={`/pets/${params.id}/appointments/new`}
                    style={newAppointmentLinkStyle}
                >
                    New Appointment
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

export default Pet;
