import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

import NavBar from "./NavBar";

function SignUp({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        })
            .then((r) => r.json())
            .then(onLogin);
    }

    return (
        <div>
            <br />
            <NavBar />
            <br />
            <Form
                style={{
                    width: "80%",
                    margin: "auto",
                    padding: "10px",
                    border: "solid",
                }}
                onSubmit={handleSubmit}
            >
                <Form.Group>
                    <Form.Field>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password_confirmation">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                        />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default SignUp;
