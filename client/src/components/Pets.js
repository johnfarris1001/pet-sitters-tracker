import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Table, Button } from "semantic-ui-react";
import Pet from "./Pet";
import NewPetForm from "./NewPetForm";

function Pets() {
    const { user } = useContext(UserContext);
    const [pets, setPets] = useState([]);
    const [showNewPetForm, setShowNewPetForm] = useState(false);

    useEffect(() => {
        fetch("/pets")
            .then((resp) => resp.json())
            .then((data) => setPets(data));
    }, [setPets]);

    function addPet(newPet) {
        setPets([...pets, newPet]);
    }

    const title = user ? `${user.username}'s Pets` : "Log in to view Pets";
    const style = user
        ? { width: "80%", margin: "auto", padding: "20px" }
        : { display: "none" };

    const petsToDisplay = pets.map((pet) => {
        return <Pet key={pet.id} pet={pet} />;
    });

    return (
        <div>
            <h2>{title}</h2>
            <div style={{ padding: "10px" }}>
                <Button onClick={() => setShowNewPetForm(!showNewPetForm)}>
                    {showNewPetForm ? "Cancel" : "Add New Pet!"}
                </Button>
            </div>
            <NewPetForm
                addPet={addPet}
                user={user}
                showNewPetForm={showNewPetForm}
                setShowNewPetForm={setShowNewPetForm}
            />
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
        </div>
    );
}

export default Pets;
