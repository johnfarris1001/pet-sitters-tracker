import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import About from "./components/About";
import Login from "./components/Login";
import Appointments from "./components/Appointments";
import SignUp from "./components/SignUp";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
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
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById("root")
);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider className="App" router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
