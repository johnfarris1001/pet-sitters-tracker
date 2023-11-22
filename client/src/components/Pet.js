import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List } from "semantic-ui-react";
import IndividualAppointments from "./IndividualAppointments";

function Pet() {
    const [pet, setPet] = useState({});
    const params = useParams();

    useEffect(() => {
        fetch(`/pets/${params.id}`)
            .then((r) => r.json())
            .then((data) => setPet(data));
    }, [setPet, params]);

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
                        <List.Description>Notes: {pet.notes}</List.Description>
                    </List.Item>
                </List>
                <IndividualAppointments individual={pet} />
            </div>
        );
    }
}

export default Pet;
