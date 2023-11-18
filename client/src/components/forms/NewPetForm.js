import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Button, Divider } from "semantic-ui-react";

function NewPetForm() {
    const { addPet, user } = useOutletContext();
    const navigate = useNavigate();
    const [newPetInfo, setNewPetInfo] = useState({
        name: "",
        species: "",
        breed: "",
        weight: "",
        age: "",
        notes: "",
    });

    function handleNewPet(e) {
        e.preventDefault();
        const newPet = { ...newPetInfo, user_id: user.id };
        fetch(`/pets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPet),
        })
            .then((r) => r.json())
            .then((data) => {
                addPet(data);
                navigate("/pets");
            });
    }

    const newPetDisplay = {
        width: "50%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    return (
        <div>
            <Form style={newPetDisplay} onSubmit={handleNewPet}>
                <h3>Add New Pet:</h3>
                <Form.Field>
                    <label>Name: </label>
                    <input
                        value={newPetInfo.name}
                        onChange={(e) =>
                            setNewPetInfo({
                                ...newPetInfo,
                                name: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Species: </label>
                    <input
                        value={newPetInfo.species}
                        onChange={(e) =>
                            setNewPetInfo({
                                ...newPetInfo,
                                species: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Breed: </label>
                    <input
                        value={newPetInfo.breed}
                        onChange={(e) =>
                            setNewPetInfo({
                                ...newPetInfo,
                                breed: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Weight: </label>
                    <input
                        value={newPetInfo.weight}
                        onChange={(e) =>
                            setNewPetInfo({
                                ...newPetInfo,
                                weight: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Age: </label>
                    <input
                        value={newPetInfo.age}
                        onChange={(e) =>
                            setNewPetInfo({
                                ...newPetInfo,
                                age: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Notes: </label>
                    <input
                        value={newPetInfo.notes}
                        onChange={(e) =>
                            setNewPetInfo({
                                ...newPetInfo,
                                notes: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Button>Submit</Button>
            </Form>
            <Divider />
        </div>
    );
}

export default NewPetForm;
