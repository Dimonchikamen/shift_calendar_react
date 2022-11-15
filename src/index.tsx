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
                role={rootElement.dataset?.role ?? ""}
                view={
                    rootElement.dataset.roleId === undefined || rootElement.dataset.roleId === null
                        ? "worktime"
                        : "interview"
                }
                isWidget={rootElement.dataset.roleId !== undefined}
                interviewRole={rootElement.dataset.roleName ?? ""}
            />
        </Provider>
    </React.StrictMode>
);
