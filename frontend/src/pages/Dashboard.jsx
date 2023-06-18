import React from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import NavBar from "../components/ProDashboard/NavBar/NavBar";
import Login from "../components/Login";
import Header from "../components/ProDashboard/Header/Header";
import "../App.css";

export default function Dashboard() {
  const { user } = useUserContext();
  return (
    <div>
      {user?.role === "pro" ? (
        <div className="dashboard_bg_color">
          <NavBar />
          <Header />
          <div className="dashboard_box">
            <Outlet />
          </div>
        </div>
      ) : (
        <Login userType="pro" />
      )}
    </div>
  );
}
