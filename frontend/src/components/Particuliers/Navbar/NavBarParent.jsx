import React, { useState, useEffect } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import BottomNavigation from "@mui/material/BottomNavigation";
import Badge from "@mui/material/Badge";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import styles from "./NavBarParent.module.css";
import { useUserContext } from "../../../contexts/UserContext";
import instance from "../../../services/APIService";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(165,165,255)",
    },
  },
});

export default function NavBarParent() {
  const [value, setValue] = useState(0);
  const { user, logout } = useUserContext();
  const [numberOfReservations, setNumberOfReservations] = useState(null);
  const delay = import.meta.env.VITE_NOTIF_FETCH_TIMING;

  const getNewNotification = () => {
    if (user?.id) {
      instance
        .get(`/notifications/number/parent`)
        .then((response) => {
          setNumberOfReservations(response.data.total);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            logout(true);
          }
        });
    }
  };
  let timer;
  useEffect(() => {
    if (user?.id && user?.role === "parent") {
      // Le timing "delay" du fetch des notifs est paramétrable via la variable d'environnement dans le fichier .env
      timer = setInterval(getNewNotification, delay);
    }
    if (!user?.id) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
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
          <NavLink to="">
            <BottomNavigationAction
              icon={<HomeIcon sx={{ color: "var(--info-color)" }} />}
            />
          </NavLink>
          <NavLink to="recherche">
            <BottomNavigationAction
              icon={<SearchIcon sx={{ color: "var(--info-color)" }} />}
            />
          </NavLink>
          <NavLink to={user?.role === "parent" ? `${user.id}` : ""}>
            <BottomNavigationAction
              icon={<PersonIcon sx={{ color: "var(--info-color)" }} />}
            />
          </NavLink>
          <NavLink to={user?.role === "parent" ? `notifications` : ""}>
            <BottomNavigationAction
              icon={
                <Badge badgeContent={numberOfReservations} color="primary">
                  <NotificationsIcon sx={{ color: "var(--info-color)" }} />
                </Badge>
              }
            />
          </NavLink>
        </BottomNavigation>
      </div>
    </ThemeProvider>
  );
}
