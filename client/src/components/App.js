import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

import "./../App.css";
import NavBar from "./NavBar";

function App() {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        fetch("/me").then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => setUser(user));
            }
        });
    }, [setUser]);

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(null));
    }

    return (
        <div className="App">
            <br />
            <NavBar />
            <br />
            <h4>
                You are Logged in as: {user ? user.username : "Not Logged In"}
            </h4>
            <button onClick={handleLogout}>Logout</button>
            <Outlet />
        </div>
    );
}

export default App;
