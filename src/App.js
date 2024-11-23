import React from "react";
import Login from "./components/login";
import DashBoad from "./components/DashBoad";
import { Route, Routes } from "react-router-dom"; // Import Routes and Route

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashBoad />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<DashBoad />} /> */}
      </Routes>
    </div>
  );
}

export default App;
