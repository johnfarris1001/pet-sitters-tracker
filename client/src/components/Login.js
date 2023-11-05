import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

import { UserContext } from "../contexts/UserContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((r) => r.json())
            .then((user) => onLogin(user));
    }

    function onLogin(user) {
        setUser(user);
        navigate("/");
    }

    return (
        <Form
            style={{
                width: "40%",
                margin: "auto",
                padding: "10px",
                border: "solid",
            }}
            onSubmit={handleSubmit}
        >
            <Form.Field>
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Field>
            <Button type="submit">Login</Button>
        </Form>
    );
}

export default Login;
