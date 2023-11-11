import { useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import NewSitterForm from "./forms/NewSitterForm";

function Sitters() {
    const [sitters, setSitters] = useState([]);
    const [showNewSitterForm, setShowNewSitterForm] = useState(false);

    useEffect(() => {
        fetch("/sitters")
            .then((resp) => resp.json())
            .then((data) => setSitters(data));
    }, [setSitters]);

    function addSitter(newSitter) {
        setSitters([...sitters, newSitter]);
    }

    const style = { width: "80%", margin: "auto", padding: "20px" };

    const sittersToDisplay = sitters.map((sitter) => {
        return (
            <Table.Row key={sitter.id}>
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
    });

    return (
        <div>
            <h2>Sitters</h2>
            <div style={{ padding: "10px" }}>
                <Button
                    onClick={() => setShowNewSitterForm(!showNewSitterForm)}
                >
                    {showNewSitterForm ? "Cancel" : "Add New Sitter!"}
                </Button>
            </div>
            <NewSitterForm
                addSitter={addSitter}
                showNewSitterForm={showNewSitterForm}
                setShowNewSitterForm={setShowNewSitterForm}
            />
            <Table celled structured style={style}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Yard At Home?</Table.HeaderCell>
                        <Table.HeaderCell>Phone Number</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Dogs</Table.HeaderCell>
                        <Table.HeaderCell>Cats</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{sittersToDisplay}</Table.Body>
            </Table>
        </div>
    );
}

export default Sitters;
