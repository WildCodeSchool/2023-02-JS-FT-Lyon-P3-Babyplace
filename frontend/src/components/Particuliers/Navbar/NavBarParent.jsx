import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import styles from "./NavBarParent.module.css";
import { useUserContext } from "../../../contexts/UserContext";

export default function NavBarParent() {
  const [value, setValue] = useState(0);
  const { user } = useUserContext();
  return (
    <div className={styles.NavBarParent}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          position: "fixed",
          zIndex: 10,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: 3,
          borderColor: "var(--main-color)",
        }}
      >
        <NavLink to={user?.role === "parent" ? "" : null}>
          <BottomNavigationAction
            icon={<HomeIcon sx={{ color: "var(--info-color)" }} />}
          />
        </NavLink>
        <NavLink to="recherche">
          <BottomNavigationAction
            icon={<SearchIcon sx={{ color: "var(--info-color)" }} />}
          />
        </NavLink>
        <NavLink to={user?.role === "parent" ? `${user.id}` : null}>
          <BottomNavigationAction
            icon={<PersonIcon sx={{ color: "var(--info-color)" }} />}
          />
        </NavLink>
        <NavLink>
          <BottomNavigationAction
            icon={<NotificationsIcon sx={{ color: "var(--info-color)" }} />}
          />
        </NavLink>
      </BottomNavigation>
    </div>
  );
}
