import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route path="/cameras" element={<CameraStream />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
