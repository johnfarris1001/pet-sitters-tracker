import { useParams, NavLink, useOutletContext } from "react-router-dom";
import { List, Divider } from "semantic-ui-react";
import IndividualAppointments from "./IndividualAppointments";

function Sitter() {
    const { sitters, removeAppointment } = useOutletContext();
    const params = useParams();

    const sitter = sitters.find((sitter) => sitter.id === parseInt(params.id));

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
                            Owned Dogs: {sitter.own_dogs}
                        </List.Description>
                        <List.Description>
                            Owned Cats: {sitter.own_cats}
                        </List.Description>
                    </List.Item>
                </List>
                <Divider />
                <h3>{sitter.name}'s Appointments: </h3>
                <IndividualAppointments
                    individual={sitter}
                    removeAppointment={removeAppointment}
                />
                <Divider />
                <NavLink
                    className="ui button"
                    to="/sitters"
                    style={{ padding: "10px" }}
                >
                    Back to Sitters
                </NavLink>
            </div>
        );
    }
}

export default Sitter;
