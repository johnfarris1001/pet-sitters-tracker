import App from "./components/App";
import About from "./components/About";
import Pets from "./components/Pets";
import Login from "./components/Login";
import Appointments from "./components/Appointments";
import SignUp from "./components/SignUp";
import Sitters from "./components/Sitters";
import ErrorPage from "./components/ErrorPage";
import NewAppointmentForm from "./components/forms/NewAppointmentForm";
import EditAppointmentForm from "./components/forms/EditAppointmentForm";

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
                path: "/",
                element: <About />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/appointments",
                element: <Appointments />,
                children: [
                    {
                        path: "/appointments/:id/edit",
                        element: <EditAppointmentForm />,
                    },
                    {
                        path: "/appointments/new",
                        element: <NewAppointmentForm />,
                    },
                ],
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
