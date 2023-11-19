import { useState, useEffect } from "react";
import { List } from "semantic-ui-react";

function About() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/users")
            .then((resp) => resp.json())
            .then((data) => setUsers(data));
    }, []);

    const usersToDisplay = users.map((item) => {
        return <List.Item key={item.id}>{item.username}</List.Item>;
    });

    return (
        <div>
            <h1>Pet Sitting Tracker</h1>
            <List>{usersToDisplay}</List>
        </div>
    );
}

export default About;
