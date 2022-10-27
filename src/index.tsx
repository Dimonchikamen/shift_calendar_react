import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/Store";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App
                role={rootElement.dataset?.role ?? "user"}
                view={
                    rootElement.dataset?.roleId === undefined ||
                    rootElement.dataset?.roleId === null ||
                    rootElement.dataset.roleId === ""
                        ? "worktime"
                        : "interview"
                }
                isWidget={rootElement.dataset.roleId === ""}
            />
        </Provider>
    </React.StrictMode>
);
