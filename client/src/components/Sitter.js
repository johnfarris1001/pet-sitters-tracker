import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { List, Divider } from "semantic-ui-react";
import IndividualAppointments from "./IndividualAppointments";

function Sitter() {
    const [sitter, setSitter] = useState({});
    const params = useParams();

    useEffect(() => {
        fetch(`/sitters/${params.id}`)
            .then((r) => r.json())
            .then((data) => setSitter(data));
    }, [setSitter, params]);

    function removeAppointment(id) {
        const newAppointments = sitter.appointments.filter((app) => {
            return app.id !== id;
        });
        setSitter({ ...sitter, appointments: newAppointments });
    }

    if (!sitter) {
        return <div>Loading...</div>;
    } else if (sitter.error) {
        return <div>{sitter.error}</div>;
    } else {
        return (
            <div>
                <h2>{sitter.name}</h2>
                <List>
                    <List.Item>
                        <List.Description>
                            Yard At Home:{" "}
                            {sitter.has_home_with_yard ? "Yes" : "No"}
                        </List.Description>
                        <List.Description>
                            Phone Number: {sitter.phone_number}
                        </List.Description>
                        <List.Description>
                            Address: {sitter.address}
                        </List.Description>
                        <List.Description>
                            Dogs: {sitter.own_dogs}
                        </List.Description>
                        <List.Description>
                            Cats: {sitter.own_cats}
                        </List.Description>
                    </List.Item>
                </List>
                <IndividualAppointments
                    individual={sitter}
                    removeAppointment={removeAppointment}
                />
                <Divider />
                <NavLink className="ui button" to="/sitters">
                    Back to Sitters
                </NavLink>
            </div>
        );
    }
}

export default Sitter;
