import React from "react";
import { useUserContext } from "../../../contexts/UserContext";
import Login from "../../Login";

function Account() {
  const { user } = useUserContext();

  if (user?.role === "parent") {
    return <div>Account</div>;
  }
  return <Login userType="parent" />;
}

export default Account;
