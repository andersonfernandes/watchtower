import { StrictMode } from "react";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import { createRoot } from "react-dom/client";
import Router from "./router";
import App from "./App";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const app = document.querySelector("#app");
if (app)
  createRoot(app).render(
    <StrictMode>
      <AuthProvider store={store}>
        <App>
          <Router />
        </App>
      </AuthProvider>
    </StrictMode>
  );
