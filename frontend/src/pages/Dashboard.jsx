import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/ProDashboard/NavBar/NavBar";
import Header from "../components/ProDashboard/Header/Header";
import DashboardHome from "../components/ProDashboard/DashboardHome/DashboardHome";
import Calendar from "../components/ProDashboard/Calendar/Calendar";
import Orders from "../components/ProDashboard/Orders/Orders";
import UserAuth from "../components/ProDashboard/UserAuth/UserAuth";
import ModifyData from "../components/ProDashboard/ModifyData/ModifyData";

import "../App.css";

export default function Dashboard() {
  return (
    <div className="dashboard_bg_color">
      <NavBar />
      <Header />
      <div className="dashboard_box">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/authentification" element={<UserAuth />} />
          <Route path="/modify" element={<ModifyData />} />
        </Routes>
      </div>
    </div>
  );
}
