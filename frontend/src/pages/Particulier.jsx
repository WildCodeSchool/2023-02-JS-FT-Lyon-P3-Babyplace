import React from "react";
import { useUserContext } from "../contexts/UserContext";
import Login from "../components/Login";

export default function Particulier() {
  const { user } = useUserContext();

  return (
    <div>
      {user?.role === "parent" ? <p>Bienvenue</p> : <Login userType="parent" />}
    </div>
  );
}
