import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

import "./../App.css";
import NavBar from "./NavBar";

function App() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/me").then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => setUser(user));
            }
        });
    }, [setUser]);

    const onLogin = (user) => {
        setUser(user);
        navigate("/");
    };

    function handleLogout() {
        if (user) {
            fetch("/logout", {
                method: "DELETE",
            }).then(() => setUser(null));
        }
    }

    return (
        <div className="App">
            <br />
            <NavBar />
            <br />
            <h4>
                {user
                    ? `You are Logged in as:  ${user.username}`
                    : `You are not Logged in`}
            </h4>
            <button
                style={user ? {} : { display: "none" }}
                onClick={handleLogout}
            >
                Logout
            </button>
            <Outlet context={onLogin} />
        </div>
    );
}

export default App;
