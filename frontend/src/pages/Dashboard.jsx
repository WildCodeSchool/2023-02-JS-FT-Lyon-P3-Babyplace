import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/ProDashboard/NavBar/NavBar";
import Header from "../components/ProDashboard/Header/Header";

import "../App.css";

export default function Dashboard() {
  return (
    <div className="dashboard_bg_color">
      <NavBar />
      <Header />
      <div className="dashboard_box">
        <Outlet />
      </div>
    </div>
  );
}
