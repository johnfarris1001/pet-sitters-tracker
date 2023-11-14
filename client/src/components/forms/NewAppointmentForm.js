import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Form, Button } from "semantic-ui-react";

import Appointments from "../Appointments";
import dateString from "../../date";

function NewAppointmentForm() {
    const { user } = useContext(UserContext);
    const [pets, setPets] = useState([]);
    const [sitters, setSitters] = useState([]);
    const [newAppointmentInfo, setNewAppointmentInfo] = useState({
        category: "Drop-in 1/2-hr",
        start_date: dateString,
        days: 0,
        notes: "",
        pet_id: 0,
        sitter_id: 0,
        user_id: user.id,
    });

    useEffect(() => {
        fetch("/pets")
            .then((resp) => resp.json())
            .then((data) => {
                setPets(data);
            });
        fetch("/sitters")
            .then((resp) => resp.json())
            .then((data) => setSitters(data));
    }, [setPets, setSitters]);

    function handleNewAppointment(e) {
        //     e.preventDefault();
        //     fetch(`/sitters`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(newSitterInfo),
        //     })
        //         .then((r) => r.json())
        //         .then((data) => addSitter(data));
        //     setShowNewSitterForm(false);
    }

    const newAppointmentDisplay = {
        width: "50%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    const categoryOptions = [
        { key: "1", text: "Drop-in 1/2-hr", value: "Drop-in 1/2-hr" },
        { key: "2", text: "Drop-in 1-hr", value: "Drop-in 1-hr" },
        { key: "3", text: "House Sit", value: "House Sit" },
        { key: "4", text: "Walk 1/2-hr", value: "Walk 1/2-hr" },
        { key: "5", text: "Walk 1-hr", value: "Walk 1-hr" },
        { key: "6", text: "Boarding", value: "Boarding" },
        { key: "7", text: "Grooming", value: "Grooming" },
        { key: "8", text: "Play Date", value: "Play Date" },
    ];

    const petOptions = pets.map((pet) => {
        return { key: pet.id, text: pet.name, value: pet.id };
    });

    const sitterOptions = sitters.map((sitter) => {
        return { key: sitter.id, text: sitter.name, value: sitter.id };
    });

    return (
        <div>
            <br />
            <Form style={newAppointmentDisplay} onSubmit={handleNewAppointment}>
                <Form.Select
                    label="Category"
                    options={categoryOptions}
                    value={newAppointmentInfo.category}
                    onChange={(e) =>
                        setNewAppointmentInfo({
                            ...newAppointmentInfo,
                            category: "Grooming",
                        })
                    }
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
                    onChange={(e) =>
                        setNewAppointmentInfo({
                            ...newAppointmentInfo,
                            pet_id: 1,
                        })
                    }
                />
                <Form.Select
                    label="Sitter"
                    options={sitterOptions}
                    value={newAppointmentInfo.sitter_id}
                    onChange={(e) =>
                        setNewAppointmentInfo({
                            ...newAppointmentInfo,
                            sitter_id: 1,
                        })
                    }
                />
                <Button>Submit</Button>
            </Form>
            <br />
            <Appointments />
        </div>
    );
}

export default NewAppointmentForm;
