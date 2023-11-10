import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Table } from "semantic-ui-react";
import Pet from "./Pet";

function Pets() {
    const { user } = useContext(UserContext);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch("/pets")
            .then((resp) => resp.json())
            .then((data) => setPets(data));
    }, [setPets]);

    const title = user ? `${user.username}'s Pets` : "Log in to view Pets";
    const style = user ? { width: "80%", margin: "auto" } : { display: "none" };

    const petsToDisplay = pets.map((pet) => {
        return <Pet key={pet.id} pet={pet} />;
    });

    return (
        <div>
            <h2>{title}</h2>
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
