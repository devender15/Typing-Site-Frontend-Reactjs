import "./App.css";

import { Routes, Route } from "react-router-dom";

import { Home, Login, LoginOption, Register, PendingRequests } from "./components";

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/options" element={<LoginOption />} />
        <Route exact path="/login/:type" element={<Login />} />
        <Route exact path="/register/:type" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
