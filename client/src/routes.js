import App from "./components/App";
import About from "./components/About";
import Pets from "./components/Pets";
import Login from "./components/Login";
import Appointments from "./components/Appointments";
import Signup from "./components/Signup";
import Sitters from "./components/Sitters";
import ErrorPage from "./components/ErrorPage";
import NewAppointmentForm from "./components/forms/NewAppointmentForm";
import EditAppointmentForm from "./components/forms/EditAppointmentForm";
import NewPetForm from "./components/forms/NewPetForm";
import NewSitterForm from "./components/forms/NewSitterForm";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/pets",
                element: <Pets />,
                children: [
                    {
                        path: "/pets/new",
                        element: <NewPetForm />,
                    },
                ],
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
                element: <Signup />,
            },
            {
                path: "/sitters",
                element: <Sitters />,
                children: [
                    {
                        path: "/sitters/new",
                        element: <NewSitterForm />,
                    },
                ],
            },
        ],
    },
];

export default routes;
