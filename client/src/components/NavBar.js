import { NavLink } from "react-router-dom";

const linkStyles = {
    width: "100px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "#097969",
    textDecoration: "none",
    color: "white",
};

function NavBar() {
    return (
        <div className="navbar">
            <NavLink to="/" style={linkStyles}>
                Home
            </NavLink>
            <NavLink to="/about" style={linkStyles}>
                About
            </NavLink>
            <NavLink to="/login" style={linkStyles}>
                Login
            </NavLink>
            <NavLink to="/appointments" style={linkStyles}>
                Appointments
            </NavLink>
        </div>
    );
}

export default NavBar;
