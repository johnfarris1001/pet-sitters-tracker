import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button } from "semantic-ui-react";

import "./../App.css";
import NavBar from "./NavBar";

function App() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

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

    function handleClick() {
        if (user) {
            fetch("/logout", {
                method: "DELETE",
            }).then(() => setUser(null));
        } else {
            navigate("/login");
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
            <Button
                style={
                    location.pathname === "/login" ? { display: "none" } : {}
                }
                onClick={handleClick}
            >
                {user ? "Logout" : "Login"}
            </Button>
            <Outlet context={onLogin} />
        </div>
    );
}

export default App;
