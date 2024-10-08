import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Areas from "./views/Areas";
import Cameras from "./views/Cameras";
import CameraStream from "./views/CameraStream";
import Home from "./views/Home";
import Login from "./views/Login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />} />

        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/" element={<Home />} />

          <Route path="/cameras" element={<Cameras />} />
          <Route path="/cameras/:id" element={<CameraStream />} />

          <Route path="/areas" element={<Areas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
