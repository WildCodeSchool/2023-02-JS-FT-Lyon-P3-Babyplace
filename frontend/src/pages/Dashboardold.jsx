import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  mainListItems,
  secondaryListItems,
} from "../components/ProDashboard/NavBar/listItems";
import styles from "../components/ProDashboard/NavBar/NavBar.module.css";
import Logo from "../assets/babyplace-logo.png";

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function NavBar() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              backgroundColor: "white",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
                color: "black",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, color: "black" }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>
            <Button
              id="basic-button"
              aria-controls={openn ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openn ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "black" }}
            >
              Marco
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openn}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Paramètres</MenuItem>
              <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <div className={styles.drawer_bar}>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
                backgroundColor: "blueviolet",
              }}
            >
              <ListItemIcon>
                <div>
                  <img src={Logo} alt="BabyPlace logo" />
                </div>
              </ListItemIcon>
              <Typography sx={{ color: "white", pr: 1, fontWeight: 900 }}>
                BabyPlace
              </Typography>
              <Typography
                sx={{ color: "white", border: 1, borderRadius: 3, px: 1 }}
              >
                Pro
              </Typography>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon sx={{ color: "white" }} />
              </IconButton>
            </Toolbar>
            <List component="nav" sx={{ my: 0, backgroundColor: "blueviolet" }}>
              {mainListItems}
              {secondaryListItems}
            </List>
          </Drawer>
        </div>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[300]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
