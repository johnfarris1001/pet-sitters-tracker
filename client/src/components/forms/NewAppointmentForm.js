import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Button, Divider } from "semantic-ui-react";
import { UserContext } from "../../contexts/UserContext";

import dateString from "../../date";

function NewAppointmentForm() {
    const { addAppointment, categoryOptions, sitterOptions, petOptions } =
        useOutletContext();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [errorMessages, setErrorMessages] = useState([]);
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
        fetch(`/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAppointmentInfo),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    addAppointment(data);
                    navigate("/appointments");
                });
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    const newAppointmentDisplay = {
        width: "50%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    if (user) {
        return (
            <div>
                <Form
                    style={newAppointmentDisplay}
                    onSubmit={handleNewAppointment}
                >
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
                                        pet.text ===
                                        e.target.firstChild.textContent
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
                    <div style={{ color: "red" }}>
                        {errorMessages.length > 0 && (
                            <div>
                                <br />
                                <h5>Appointment is Invalid</h5>
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
    } else {
        return <h4>Cannot create new Appointments when not logged in</h4>;
    }
}

export default NewAppointmentForm;
