import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useUserContext } from "../../../contexts/UserContext";
import Login from "../../Login";
import styles from "./Account.module.css";
import AuthenticationChange from "./AuthenticationChange";
import Orders from "./Orders";
import AccountHeader from "./AccountHeader";

function Account() {
  const { user } = useUserContext();
  const [accountScreen, setAccountScreen] = useState("menu");

  if (user?.role === "parent") {
    if (accountScreen === "orders") {
      return <Orders setAccountScreen={setAccountScreen} />;
    }
    if (accountScreen === "authentication") {
      return <AuthenticationChange setAccountScreen={setAccountScreen} />;
    }
    return (
      <div>
        <AccountHeader />
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
