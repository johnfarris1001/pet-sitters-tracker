import { useState, useEffect } from "react";
import { Table, Form, Button } from "semantic-ui-react";

function Sitters() {
    const [sitters, setSitters] = useState([]);
    const [showNewSitterForm, setShowNewSitterForm] = useState(false);
    const [newSitterInfo, setNewSitterInfo] = useState({
        name: "",
        has_home_with_yard: true,
        phone_number: "",
        address: "",
        own_dogs: 0,
        own_cats: 0,
    });

    useEffect(() => {
        fetch("/sitters")
            .then((resp) => resp.json())
            .then((data) => setSitters(data));
    }, [setSitters]);

    function handleNewSitter(e) {
        e.preventDefault();
        fetch(`/sitters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSitterInfo),
        })
            .then((r) => r.json())
            .then((data) => addSitter(data));
        setShowNewSitterForm(false);
    }

    function addSitter(newSitter) {
        setSitters([...sitters, newSitter]);
    }

    const options = [
        { key: "y", text: "Yes", value: true },
        { key: "n", text: "No", value: false },
    ];

    const style = { width: "80%", margin: "auto" };

    const newSitterDisplay = showNewSitterForm
        ? { width: "50%", margin: "auto", padding: "10px", border: "solid" }
        : { display: "none" };

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

    console.log(newSitterInfo.has_home_with_yard);

    return (
        <div>
            <h2>Sitters</h2>
            <div style={{ padding: "20px" }}>
                <Button
                    onClick={() => setShowNewSitterForm(!showNewSitterForm)}
                >
                    {showNewSitterForm ? "Cancel" : "Add New Sitter!"}
                </Button>
            </div>
            <Form style={newSitterDisplay} onSubmit={handleNewSitter}>
                <Form.Group>
                    <Form.Field>
                        <label>Name: </label>
                        <input
                            value={newSitterInfo.name}
                            onChange={(e) =>
                                setNewSitterInfo({
                                    ...newSitterInfo,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Select
                        value={newSitterInfo.has_home_with_yard}
                        label="Has Yard At Home?"
                        options={options}
                        onChange={(e) =>
                            setNewSitterInfo({
                                ...newSitterInfo,
                                has_home_with_yard: e.target.value,
                            })
                        }
                        placeholder="Yes"
                    />
                    <Form.Field>
                        <label>Phone Number: </label>
                        <input
                            value={newSitterInfo.phone_number}
                            onChange={(e) =>
                                setNewSitterInfo({
                                    ...newSitterInfo,
                                    phone_number: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Address: </label>
                        <input
                            value={newSitterInfo.address}
                            onChange={(e) =>
                                setNewSitterInfo({
                                    ...newSitterInfo,
                                    address: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Number of Dogs: </label>
                        <input
                            value={newSitterInfo.own_dogs}
                            onChange={(e) =>
                                setNewSitterInfo({
                                    ...newSitterInfo,
                                    own_dogs: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Number of Cats: </label>
                        <input
                            value={newSitterInfo.own_cats}
                            onChange={(e) =>
                                setNewSitterInfo({
                                    ...newSitterInfo,
                                    own_cats: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Button>Submit</Button>
                </Form.Group>
            </Form>
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
