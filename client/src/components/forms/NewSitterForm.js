import { useState } from "react";
import { Form, Button } from "semantic-ui-react";

function NewSitterForm({ addSitter, showNewSitterForm, setShowNewSitterForm }) {
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
        })
            .then((r) => r.json())
            .then((data) => addSitter(data));
        setShowNewSitterForm(false);
    }

    const newSitterDisplay = showNewSitterForm
        ? { width: "50%", margin: "auto", padding: "20px", border: "solid" }
        : { display: "none" };

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
            <Form.Group inline>
                <label>Has Yard At Home?</label>
                <Form.Radio
                    label="Yes"
                    checked={newSitterInfo.has_home_with_yard === true}
                    onChange={(e) =>
                        setNewSitterInfo({
                            ...newSitterInfo,
                            has_home_with_yard:
                                !newSitterInfo.has_home_with_yard,
                        })
                    }
                />
                <Form.Radio
                    label="No"
                    checked={newSitterInfo.has_home_with_yard === false}
                    onChange={(e) =>
                        setNewSitterInfo({
                            ...newSitterInfo,
                            has_home_with_yard:
                                !newSitterInfo.has_home_with_yard,
                        })
                    }
                />
            </Form.Group>
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
        </Form>
    );
}

export default NewSitterForm;
