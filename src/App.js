import React from "react";
import DashBoad from "./components/DashBoad";
import { Route, Routes } from "react-router-dom"; // Import Routes and Route
import EventGrid from "./components/EventGrid";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashBoad />} />
        <Route path="/events" element={<EventGrid />} />
        {/* <Route path="/forgot-password" element={<DashBoad />} /> */}
      </Routes>
    </div>
  );
}

export default App;
