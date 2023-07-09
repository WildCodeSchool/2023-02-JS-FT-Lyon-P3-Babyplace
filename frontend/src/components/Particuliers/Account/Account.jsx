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
    return (
      <div>
        <AccountHeader />
        {accountScreen === "orders" ? (
          <Orders setAccountScreen={setAccountScreen} />
        ) : null}
        {accountScreen === "authentication" ? (
          <AuthenticationChange setAccountScreen={setAccountScreen} />
        ) : null}
        {accountScreen === "menu" ? (
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
        ) : null}
      </div>
    );
  }
  return <Login userType="parent" />;
}

export default Account;
