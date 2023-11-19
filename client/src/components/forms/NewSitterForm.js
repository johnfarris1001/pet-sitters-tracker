import { useState } from "react";
import { Form, Button } from "semantic-ui-react";

function NewSitterForm({ addSitter, showNewSitterForm, setShowNewSitterForm }) {
    const [error, setError] = useState("");
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
                });
                setShowNewSitterForm(false);
            } else {
                setError("Sitter is invalid");
            }
        });
    }

    const newSitterDisplay = showNewSitterForm
        ? { width: "50%", margin: "auto", padding: "20px", border: "solid" }
        : { display: "none" };

    const options = [
        { key: "y", text: "Yes", value: true },
        { key: "n", text: "No", value: false },
    ];

    return (
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
                        has_home_with_yard: !newSitterInfo.has_home_with_yard,
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
            <div style={error ? { color: "red" } : { display: "none" }}>
                <br />
                <h5>{error}</h5>
                <p>
                    Sitter must have a name
                    <br />
                    Sitter must have an address and phone number
                </p>
            </div>
        </Form>
    );
}

export default NewSitterForm;
