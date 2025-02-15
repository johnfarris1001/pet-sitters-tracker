import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button, Divider } from "semantic-ui-react";
import dateString from "../../date";

function EditAppointmentForm() {
    const { editAppointment, appointments, categoryOptions, pet } =
        useOutletContext();

    const params = useParams();
    const navigate = useNavigate();
    const [sitters, setSitters] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const appointment = appointments.find(
        (app) => app.id === parseInt(params.appid)
    );
    const [appointmentInfo, setAppointmentInfo] = useState({
        category: "Drop-in 1/2-hr",
        start_date: dateString,
        days: 0,
        notes: "",
        pet_id: 0,
        sitter_id: 0,
    });

    useEffect(() => {
        if (appointment) {
            setAppointmentInfo({
                category: appointment.category,
                start_date: appointment.start_date,
                days: appointment.days,
                notes: appointment.notes,
                pet_id: appointment.pet.id,
                sitter_id: appointment.sitter.id,
            });
        }
        fetch("/sitters")
            .then((r) => r.json())
            .then((data) => setSitters(data));
    }, [appointment]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/appointments/${appointment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentInfo),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    editAppointment(data);
                    navigate(`/pets/${params.id}`);
                });
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    const editAppointmentDisplay = {
        width: "50%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    const sitterOptions = sitters.map((sitter) => {
        return {
            key: sitter.id,
            text: sitter.name,
            value: sitter.id,
        };
    });

    if (appointment) {
        return (
            <div>
                <br />
                <Form style={editAppointmentDisplay} onSubmit={handleSubmit}>
                    <h3>Edit Appointment: </h3>
                    <Form.Select
                        label="Category"
                        options={categoryOptions}
                        value={appointmentInfo.category}
                        onChange={(e) => {
                            setAppointmentInfo({
                                ...appointmentInfo,
                                category: e.target.firstChild.textContent,
                            });
                        }}
                    />
                    <Form.Field>
                        <label>Start Date </label>
                        <input
                            value={appointmentInfo.start_date}
                            type="date"
                            onChange={(e) =>
                                setAppointmentInfo({
                                    ...appointmentInfo,
                                    start_date: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Repeat Days: </label>
                        <input
                            value={appointmentInfo.days}
                            onChange={(e) =>
                                setAppointmentInfo({
                                    ...appointmentInfo,
                                    days: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Notes: </label>
                        <input
                            value={appointmentInfo.notes}
                            onChange={(e) =>
                                setAppointmentInfo({
                                    ...appointmentInfo,
                                    notes: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Select
                        label="Sitter"
                        options={sitterOptions}
                        value={appointmentInfo.sitter_id}
                        onChange={(e) =>
                            setAppointmentInfo({
                                ...appointmentInfo,
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
        return <div>Users can only edit their own pets appointments</div>;
    }
}

export default EditAppointmentForm;
