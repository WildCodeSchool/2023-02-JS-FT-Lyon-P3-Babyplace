import React from "react";
import Login from "../components/Login";
import { useUserContext } from "../contexts/UserContext";

export default function Particulier() {
  const { user } = useUserContext();

  return (
    <div>
      {user?.role === "parent" ? <p>Bienvenue</p> : <Login userType="parent" />}
    </div>
  );
}
