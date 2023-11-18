import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button, Divider } from "semantic-ui-react";
import dateString from "../../date";

function EditAppointmentForm() {
    const {
        editAppointment,
        appointments,
        categoryOptions,
        sitterOptions,
        petOptions,
    } = useOutletContext();

    const params = useParams();
    const navigate = useNavigate();
    const appointment = appointments.find(
        (app) => app.id === parseInt(params.id)
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
    }, [appointment]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/appointments/${appointment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointmentInfo),
        })
            .then((r) => r.json())
            .then((data) => {
                console.log(data);
                editAppointment(data);
                navigate("/appointments");
            });
    }

    const editAppointmentDisplay = {
        width: "50%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

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
                        label="Pet"
                        options={petOptions}
                        value={appointmentInfo.pet_id}
                        onChange={(e) => {
                            setAppointmentInfo({
                                ...appointmentInfo,
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
                    <Button onClick={() => navigate("/appointments")}>
                        Cancel
                    </Button>
                </Form>
                <Divider />
            </div>
        );
    } else {
        return <div>Loading</div>;
    }
}

export default EditAppointmentForm;
