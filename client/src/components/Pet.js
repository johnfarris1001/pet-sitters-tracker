import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List } from "semantic-ui-react";

function Pet() {
    const [pet, setPet] = useState({});
    const params = useParams();

    useEffect(() => {
        fetch(`/pets/${params.id}`)
            .then((resp) => resp.json())
            .then((data) => setPet(data));
    }, [setPet]);

    return (
        <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
            <h2>{pet ? `${pet.name} the ${pet.species}` : null}</h2>
            <List>
                <List.Item>{`Breed: ${pet.breed}`}</List.Item>
                <List.Item>{`Weight: ${pet.weight}`}</List.Item>
                <List.Item>{`Age: ${pet.age}`}</List.Item>
                <List.Description>{`Notes: ${pet.notes}`}</List.Description>
            </List>
        </div>
    );
}

export default Pet;
