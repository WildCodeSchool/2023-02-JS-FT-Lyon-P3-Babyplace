import { useState } from "react";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import styles from "./NavBar.module.css";
import Logo from "../../../assets/babyplace-logo.png";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(true);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div
      className={openMenu ? `${styles.nav_container}` : `${styles.closed_menu}`}
    >
      <button
        className={styles.btn_menu}
        onClick={handleOpenMenu}
        type="button"
      >
        {openMenu ? (
          <ArrowBackIosNewOutlinedIcon sx={{ color: "white" }} />
        ) : (
          <ArrowForwardIosOutlinedIcon sx={{ color: "white" }} />
        )}
      </button>
      <div className={styles.logoandname}>
        <img src={Logo} alt="Babyplace logo" />
        <h1 className={openMenu ? "" : `${styles.diplay_none_class}`}>
          Babyplace<span>Pro</span>
        </h1>
      </div>
      <div className={openMenu ? `${styles.all_nav_elements}` : ""}>
        <div className={styles.nav_menu_first}>
          <NavLink className={styles.menu_link_style} to="">
            <ListItemButton>
              <ListItemIcon>
                <DashboardOutlinedIcon
                  variant="outlined"
                  sx={{ color: "white" }}
                />
              </ListItemIcon>
              <h4
                className={
                  openMenu
                    ? `${styles.menu_title_element}`
                    : `${styles.diplay_none_class}`
                }
              >
                Tableau de bord
              </h4>
            </ListItemButton>
          </NavLink>
        </div>
        <div className={styles.nav_menu_second}>
          <h2 className={openMenu ? "" : `${styles.diplay_none_class}`}>
            Réservation
          </h2>
          <NavLink className={styles.menu_link_style} to="orders">
            <ListItemButton>
              <ListItemIcon>
                <ListAltOutlinedIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <h4
                className={
                  openMenu
                    ? `${styles.menu_title_element}`
                    : `${styles.diplay_none_class}`
                }
              >
                Liste des commandes
              </h4>
            </ListItemButton>
          </NavLink>
          <NavLink className={styles.menu_link_style} to="calendar">
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthOutlinedIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <h4
                className={
                  openMenu
                    ? `${styles.menu_title_element}`
                    : `${styles.diplay_none_class}`
                }
              >
                Agenda
              </h4>
            </ListItemButton>
          </NavLink>
        </div>
        <div className={styles.nav_menu_third}>
          <h2 className={openMenu ? "" : `${styles.diplay_none_class}`}>
            Administration
          </h2>
          <NavLink className={styles.menu_link_style} to="authentification">
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleOutlinedIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <h4
                className={
                  openMenu
                    ? `${styles.menu_title_element}`
                    : `${styles.diplay_none_class}`
                }
              >
                Authentification
              </h4>
            </ListItemButton>
          </NavLink>
          <NavLink className={styles.menu_link_style} to="modify">
            <ListItemButton>
              <ListItemIcon>
                <CreateOutlinedIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <h4
                className={
                  openMenu
                    ? `${styles.menu_title_element}`
                    : `${styles.diplay_none_class}`
                }
              >
                Modifier mes infos
              </h4>
            </ListItemButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
