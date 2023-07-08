import React from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Login from "../components/Login";
import NavBarParent from "../components/Particuliers/Navbar/NavBarParent";

export default function Particulier() {
  const { user } = useUserContext();

  return (
    <div>
      {user?.role === "parent" ? (
        <>
          <div>
            <Outlet />
          </div>
          <NavBarParent />
        </>
      ) : (
        <Login userType="parent" />
      )}
    </div>
  );
}
