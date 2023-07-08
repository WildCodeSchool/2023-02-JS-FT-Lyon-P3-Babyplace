import React from "react";
import { Outlet } from "react-router-dom";
import NavBarParent from "../components/Particuliers/Navbar/NavBarParent";

export default function Particulier() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      <NavBarParent />
    </div>
  );
}
