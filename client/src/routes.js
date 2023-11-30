import App from "./components/App";
import About from "./components/About";
import Pets from "./components/Pets";
import Pet from "./components/Pet";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sitters from "./components/Sitters";
import Sitter from "./components/Sitter";
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
                    {
                        path: "/pets/:id",
                        element: <Pet />,
                        children: [
                            {
                                path: "/pets/:id/appointments/new",
                                element: <NewAppointmentForm />,
                            },
                            {
                                path: "/pets/:id/appointments/:appid/edit",
                                element: <EditAppointmentForm />,
                            },
                        ],
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
            {
                path: "/sitters/:id",
                element: <Sitter />,
            },
        ],
    },
];

export default routes;
