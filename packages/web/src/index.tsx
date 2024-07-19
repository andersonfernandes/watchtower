import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <StrictMode>
      <h1>Home Guardian</h1>
    </StrictMode>
  );
};

const app = document.querySelector("#app");
if (app) createRoot(app).render(<App />);
