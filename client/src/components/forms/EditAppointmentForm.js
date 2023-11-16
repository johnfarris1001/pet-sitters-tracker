import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dateString from "../../date";

function EditAppointmentForm() {
    const { appointments } = useOutletContext();
    const params = useParams();
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
                pet_id: appointment.pet_id,
                sitter_id: appointment.sitter_id,
            });
        } else {
            setAppointmentInfo({
                category: "Drop-in 1/2-hr",
                start_date: dateString,
                days: 0,
                notes: "",
                pet_id: 0,
                sitter_id: 0,
            });
        }
    }, [appointment]);

    if (appointment) {
        return <div>EditAppointmentForm {appointment.id}</div>;
    } else {
        return <div>Loading</div>;
    }
}

export default EditAppointmentForm;
