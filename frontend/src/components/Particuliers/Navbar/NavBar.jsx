import React, { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
// import styles from "./NavBar.module.css";

export default function NavBar() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value === 0) {
      console.warn(value);
    }
    if (value === 1) {
      console.warn(value);
    }
    if (value === 2) {
      console.warn(value);
    }
    if (value === 2) {
      console.warn(value);
    }
  }, [value]);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigationAction icon={<HomeIcon />} />
      <BottomNavigationAction icon={<SearchIcon />} />
      <BottomNavigationAction icon={<PersonIcon />} />
      <BottomNavigationAction icon={<NotificationsIcon />} />
    </BottomNavigation>
  );
}
