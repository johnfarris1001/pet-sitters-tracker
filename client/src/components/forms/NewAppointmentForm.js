import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Form, Button, Divider } from "semantic-ui-react";

import dateString from "../../date";

function NewAppointmentForm() {
    const { addAppointment, categoryOptions, sitterOptions, petOptions } =
        useOutletContext();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { user } = useContext(UserContext);
    const [newAppointmentInfo, setNewAppointmentInfo] = useState({
        category: "Drop-in 1/2-hr",
        start_date: dateString,
        days: 0,
        notes: "",
        pet_id: 0,
        sitter_id: 0,
    });

    function handleNewAppointment(e) {
        e.preventDefault();
        const newAppointment = { ...newAppointmentInfo, user_id: user.id };
        fetch(`/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAppointment),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    addAppointment(data);
                    navigate("/appointments");
                });
            } else {
                setError("Appointment is invalid");
            }
        });
    }

    const newAppointmentDisplay = {
        width: "50%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    return (
        <div>
            <Divider />
            <Form style={newAppointmentDisplay} onSubmit={handleNewAppointment}>
                <h3>Add New Appointment: </h3>
                <Form.Select
                    label="Category"
                    options={categoryOptions}
                    value={newAppointmentInfo.category}
                    onChange={(e) => {
                        setNewAppointmentInfo({
                            ...newAppointmentInfo,
                            category: e.target.firstChild.textContent,
                        });
                    }}
                />
                <Form.Field>
                    <label>Start Date </label>
                    <input
                        value={newAppointmentInfo.start_date}
                        type="date"
                        onChange={(e) =>
                            setNewAppointmentInfo({
                                ...newAppointmentInfo,
                                start_date: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Repeat Days: </label>
                    <input
                        value={newAppointmentInfo.days}
                        onChange={(e) =>
                            setNewAppointmentInfo({
                                ...newAppointmentInfo,
                                days: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Notes: </label>
                    <input
                        type="text"
                        value={newAppointmentInfo.notes}
                        onChange={(e) =>
                            setNewAppointmentInfo({
                                ...newAppointmentInfo,
                                notes: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Select
                    label="Pet"
                    options={petOptions}
                    value={newAppointmentInfo.pet_id}
                    onChange={(e) => {
                        setNewAppointmentInfo({
                            ...newAppointmentInfo,
                            pet_id: petOptions.filter((pet) => {
                                return (
                                    pet.text === e.target.firstChild.textContent
                                );
                            })[0].value,
                        });
                    }}
                />
                <Form.Select
                    label="Sitter"
                    options={sitterOptions}
                    value={newAppointmentInfo.sitter_id}
                    onChange={(e) =>
                        setNewAppointmentInfo({
                            ...newAppointmentInfo,
                            sitter_id: sitterOptions.filter((sitter) => {
                                return (
                                    sitter.text ===
                                    e.target.firstChild.textContent
                                );
                            })[0].value,
                        })
                    }
                />
                <Button>Submit</Button>
                <Button onClick={() => navigate("/appointments")}>
                    Cancel
                </Button>
                <div style={error ? { color: "red" } : { display: "none" }}>
                    <br />
                    <h5>{error}</h5>
                    <p>
                        Must select a pet and a sitter
                        <br />
                        Must not have more than 7 repeat days
                    </p>
                </div>
            </Form>
            <Divider />
        </div>
    );
}

export default NewAppointmentForm;
