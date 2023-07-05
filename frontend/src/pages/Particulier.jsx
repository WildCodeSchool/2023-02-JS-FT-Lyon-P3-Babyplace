import React from "react";
import { useUserContext } from "../contexts/UserContext";
import Login from "../components/Login";
import NavBar from "../components/Particuliers/Navbar/NavBar";
// import WelcomePage from "../components/Particuliers/WelcomePage/WelcomePage";

export default function Particulier() {
  const { user } = useUserContext();

  return (
    <div>
      {user?.role === "parent" ? <NavBar /> : <Login userType="parent" />}
    </div>
  );
}
