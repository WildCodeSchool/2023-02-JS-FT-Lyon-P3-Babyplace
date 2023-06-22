import React from "react";
import { useUserContext } from "../contexts/UserContext";
import Login from "../components/Login";
import WelcomePage from "../components/Particuliers/WelcomePage/WelcomePage";

export default function Particulier() {
  const { user } = useUserContext();

  return (
    <div>
      {user?.role === "parent" ? <WelcomePage /> : <Login userType="parent" />}
    </div>
  );
}
