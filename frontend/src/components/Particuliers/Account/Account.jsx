import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import avatar from "../../../assets/ed-cannan.png";
import { useUserContext } from "../../../contexts/UserContext";
import Login from "../../Login";
import styles from "./Account.module.css";
import AuthenticationChange from "./AuthenticationChange";
import Orders from "./Orders";

function Account() {
  const { user } = useUserContext();
  const [accountScreen, setAccountScreen] = useState("menu");

  if (user?.role === "parent") {
    if (accountScreen === "orders") {
      return <Orders />;
    }
    if (accountScreen === "authentication") {
      return <AuthenticationChange />;
    }
    return (
      <div>
        <div className={styles.header}>
          <div className={styles.avatarWrap}>
            <img className={styles.avatar} src={avatar} alt="avatar" />
          </div>
          <div className={styles.name}>
            <h1>{user.firstname}</h1>
            <h1>{user.lastname}</h1>
          </div>
        </div>
        <ul className={styles.menu}>
          <li>
            <button
              type="button"
              onClick={() => {
                setAccountScreen("authentication");
              }}
            >
              <LockOutlinedIcon sx={{ color: "var(--main-color)" }} />
              <p>Données d'authentification</p>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setAccountScreen("orders");
              }}
            >
              <BookmarkBorderIcon sx={{ color: "var(--main-color)" }} />
              <p>Réservations</p>
            </button>
          </li>
        </ul>
      </div>
    );
  }
  return <Login userType="parent" />;
}

export default Account;
