import { NavLink } from "react-router-dom";

const linkStyles = {
    width: "100px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "#0047AB",
    textDecoration: "none",
    color: "white",
};

function NavBar() {
    return (
        <div className="navbar">
            <NavLink to="/" style={linkStyles}>
                Home
            </NavLink>
            <NavLink to="/signup" style={linkStyles}>
                SignUp
            </NavLink>
            <NavLink to="/pets" style={linkStyles}>
                Pets
            </NavLink>
            <NavLink to="/sitters" style={linkStyles}>
                Sitters
            </NavLink>
            <NavLink to="/appointments" style={linkStyles}>
                Appointments
            </NavLink>
        </div>
    );
}

export default NavBar;
