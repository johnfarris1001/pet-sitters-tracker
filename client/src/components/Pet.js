import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { List, Divider } from "semantic-ui-react";
import IndividualAppointments from "./IndividualAppointments";

function Pet() {
    const [pet, setPet] = useState({});
    const params = useParams();

    useEffect(() => {
        fetch(`/pets/${params.id}`)
            .then((r) => r.json())
            .then((data) => setPet(data));
    }, [setPet, params]);

    function removeAppointment(id) {
        const newAppointments = pet.appointments.filter((app) => {
            return app.id !== id;
        });
        setPet({ ...pet, appointments: newAppointments });
    }

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
                <IndividualAppointments
                    individual={pet}
                    removeAppointment={removeAppointment}
                />
                <Divider />
                <NavLink className="ui button" to="/pets">
                    Back to Pets
                </NavLink>
            </div>
        );
    }
}

export default Pet;
