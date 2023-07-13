import { useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemButton from "@mui/material/ListItemButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useUserContext } from "../../../contexts/UserContext";
import User from "../../../assets/icones/user-logo.png";
import styles from "./Header.module.css";
import NotificationBox from "./Notifications/NotificationBox";
import instance from "../../../services/APIService";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(165,165,255)",
    },
  },
});

export default function Header() {
  const [openNotificationBox, setOpenNotificationBox] = useState(false);
  const [numberOfReservations, setNumberOfReservations] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, logout } = useUserContext();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenNotificationBox(false);
  };
  const handleLogout = () => {
    logout(false);
    setAnchorEl(null);
    setOpenNotificationBox(false);
  };

  const handleNotification = () => {
    setOpenNotificationBox(!openNotificationBox);
    setAnchorEl(null);
  };

  const getNewNotification = () => {
    instance
      .get(`/notifications/number`)
      .then((response) => {
        setNumberOfReservations(response.data.total);
      })
      .catch((err) => console.error(err));
  };

  setInterval(getNewNotification, 5000);

  return (
    <ThemeProvider theme={theme}>
      <div
        className={
          openNotificationBox
            ? `${styles.notification_box_position_godown}`
            : `${styles.notification_box_position_goup}`
        }
      >
        {openNotificationBox && <NotificationBox />}
      </div>

      <div className={styles.header_container}>
        <div className={styles.header_box}>
          <div className={styles.header_notification}>
            <ListItemButton
              onClick={handleNotification}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                width: 60,
              }}
            >
              <Badge badgeContent={numberOfReservations} color="primary">
                <NotificationsNoneOutlinedIcon sx={{ color: "black" }} />
              </Badge>
            </ListItemButton>
          </div>
          <div className={styles.header_user_box}>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "black", fontSize: 12 }}
              >
                <div className={styles.user_img_box}>
                  <img src={User} alt="User" />
                </div>
                {user.name}
                <KeyboardArrowDownOutlinedIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Mes paramètres</MenuItem>
                <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
