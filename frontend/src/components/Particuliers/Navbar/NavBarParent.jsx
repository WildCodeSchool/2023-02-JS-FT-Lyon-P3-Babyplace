import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
// import styles from "./NavBar.module.css";

export default function NavBar() {
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ position: "fixed", zIndex: 10, bottom: 0, left: 0, right: 0 }}
    >
      <NavLink to="compte">
        <BottomNavigationAction icon={<HomeIcon />} />
      </NavLink>
      <NavLink to="recherche">
        <BottomNavigationAction icon={<SearchIcon />} />
      </NavLink>
      <NavLink>
        <BottomNavigationAction icon={<PersonIcon />} />
      </NavLink>
      <NavLink>
        <BottomNavigationAction icon={<NotificationsIcon />} />
      </NavLink>
    </BottomNavigation>
  );
}
