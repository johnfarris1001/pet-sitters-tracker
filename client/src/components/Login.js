import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const onLogin = useOutletContext();

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
            .then((user) => {
                if (user.error) {
                    setUsername("");
                    setPassword("");
                    setErrorMessage("Incorrect Username");
                } else if (user.errors) {
                    setPassword("");
                    setErrorMessage("Incorrect Password");
                } else {
                    onLogin(user);
                }
            });
    }

    return (
        <div>
            <br />
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
                <h5 style={{ color: "red" }}>{errorMessage}</h5>
            </Form>
        </div>
    );
}

export default Login;
