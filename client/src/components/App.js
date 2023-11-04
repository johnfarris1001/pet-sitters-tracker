import { Outlet } from "react-router-dom";

import "./../App.css";
import NavBar from "./NavBar";

function App() {
    return (
        <div className="App">
            <br />
            <NavBar />
            <br />
            <Outlet />
        </div>
    );
}

export default App;
