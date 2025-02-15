import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Button, Divider } from "semantic-ui-react";

function NewSitterForm() {
    const { addSitter } = useOutletContext();
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState([]);
    const [newSitterInfo, setNewSitterInfo] = useState({
        name: "",
        has_home_with_yard: true,
        phone_number: "",
        address: "",
        own_dogs: 0,
        own_cats: 0,
    });

    function handleNewSitter(e) {
        e.preventDefault();
        fetch(`/sitters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSitterInfo),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    addSitter(data);
                    navigate("/sitters");
                });
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    const newSitterDisplay = {
        width: "50%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    const options = [
        { key: "y", text: "Yes", value: true },
        { key: "n", text: "No", value: false },
    ];

    return (
        <div>
            <Form style={newSitterDisplay} onSubmit={handleNewSitter}>
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
                    label="Has Yard At Home?"
                    options={options}
                    value={newSitterInfo.has_home_with_yard}
                    onChange={(e) =>
                        setNewSitterInfo({
                            ...newSitterInfo,
                            has_home_with_yard:
                                !newSitterInfo.has_home_with_yard,
                        })
                    }
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
                <div style={{ color: "red" }}>
                    {errorMessages.length > 0 && (
                        <div>
                            <br />
                            <h5>Sitter is Invalid</h5>
                            <ul>
                                {errorMessages.map((error) => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Form>
            <Divider />
        </div>
    );
}

export default NewSitterForm;
