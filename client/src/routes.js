import App from "./components/App";
import About from "./components/About";
import Login from "./components/Login";
import Appointments from "./components/Appointments";
import SignUp from "./components/SignUp";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/appointments",
                element: <Appointments />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
];

export default routes;
