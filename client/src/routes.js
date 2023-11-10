import App from "./components/App";
import Pets from "./components/Pets";
import Login from "./components/Login";
import Appointments from "./components/Appointments";
import SignUp from "./components/SignUp";
import Sitters from "./components/Sitters";
import ErrorPage from "./components/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/pets",
                element: <Pets />,
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
            {
                path: "/sitters",
                element: <Sitters />,
            },
        ],
    },
];

export default routes;
