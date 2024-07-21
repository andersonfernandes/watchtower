import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cameras from "./views/cameras";
import Home from "./views/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cameras",
    element: <Cameras />,
  },
]);

const app = document.querySelector("#app");
if (app)
  createRoot(app).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
