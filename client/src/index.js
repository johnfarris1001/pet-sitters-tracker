import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import routes from "./routes";
// import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter(routes);

ReactDOM.render(
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>,
    document.getElementById("root")
);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider className="App" router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
