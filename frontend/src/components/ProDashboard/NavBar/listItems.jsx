import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import styles from "./NavBar.module.css";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
      second: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#414040",
    },
    text: {
      primary: "rgba(255,255,255)",
      secondary: "#efefef",
    },
  },
});

export const mainListItems = (
  <ThemeProvider theme={theme}>
    <div className={styles.menu_text_color}>
      <ListItemButton
        sx={{
          border: 1,
          borderRadius: 3,
          mx: 1,
          backgroundColor: "blueviolet",
        }}
      >
        <ListItemIcon>
          <DashboardOutlinedIcon
            variant="outlined"
            sx={{ color: "primary.second" }}
          />
        </ListItemIcon>
        <ListItemText primary="Tableau de bord" />
      </ListItemButton>
      <ListSubheader
        component="div"
        inset
        sx={{
          paddingTop: 10,
          fontSize: 20,
          fontWeight: 600,
          backgroundColor: "blueviolet",
          color: "text.secondary",
        }}
      >
        Réservations
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <ListAltOutlinedIcon sx={{ color: "primary.second" }} />
        </ListItemIcon>
        <ListItemText primary="Liste des commandes" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonthOutlinedIcon sx={{ color: "primary.second" }} />
        </ListItemIcon>
        <ListItemText primary="Agenda" />
      </ListItemButton>
    </div>
  </ThemeProvider>
);

export const secondaryListItems = (
  <ThemeProvider theme={theme}>
    <div className={styles.menu_text_color}>
      <ListSubheader
        component="div"
        inset
        sx={{
          paddingTop: 10,
          fontSize: 20,
          fontWeight: 600,
          backgroundColor: "blueviolet",
          color: "text.secondary",
        }}
      >
        Administration
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleOutlinedIcon sx={{ color: "primary.second" }} />
        </ListItemIcon>
        <ListItemText primary="Authentification" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <CreateOutlinedIcon sx={{ color: "primary.second" }} />
        </ListItemIcon>
        <ListItemText primary="Modifier mes infos" />
      </ListItemButton>
    </div>
  </ThemeProvider>
);
