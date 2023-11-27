import { useState, useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Button, Divider } from "semantic-ui-react";
import { UserContext } from "../../contexts/UserContext";

import dateString from "../../date";

function NewAppointmentForm() {
    const { addAppointment, categoryOptions, pet } = useOutletContext();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [sitters, setSitters] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [newAppointmentInfo, setNewAppointmentInfo] = useState({
        category: "Drop-in 1/2-hr",
        start_date: dateString,
        days: 0,
        notes: "",
        sitter_id: 0,
    });

    useEffect(() => {
        fetch("/sitters")
            .then((r) => r.json())
            .then((data) => setSitters(data));
    }, []);

    function handleNewAppointment(e) {
        e.preventDefault();
        const newAppointment = { ...newAppointmentInfo, pet_id: pet.id };
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
                    navigate(`/pets/${pet.id}`);
                });
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    const sitterOptions = sitters.map((sitter) => {
        return {
            key: sitter.id,
            text: sitter.name,
            value: sitter.id,
        };
    });

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
                    <h3>Add New Appointment for {pet.name}: </h3>
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
                    <Button onClick={() => navigate(`/pets/${pet.id}`)}>
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
