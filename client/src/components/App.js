import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import "./../App.css";
import NavBar from "./NavBar";

function App() {
    const user = useContext(UserContext);
    return (
        <div className="App">
            <br />
            <NavBar />
            <br />
            <h4>You are Logged in as: {user.username}</h4>
            <Outlet />
        </div>
    );
}

export default App;
