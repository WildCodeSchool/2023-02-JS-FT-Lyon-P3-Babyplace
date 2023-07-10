import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import BasicModal from "../../ModalWrapper/BasicModal";
import { useUserContext } from "../../../contexts/UserContext";
import Login from "../../Login";
import styles from "./Account.module.css";
import AuthenticationChange from "./AuthenticationChange";
import OrdersParent from "./OrdersParent";
import AccountHeader from "./AccountHeader";

function Account() {
  const { user, logout } = useUserContext();
  const [accountScreen, setAccountScreen] = useState("menu");
  if (user?.role === "parent") {
    return (
      <div className={styles.accountScreens}>
        <AccountHeader />
        {accountScreen === "orders" ? (
          <OrdersParent setAccountScreen={setAccountScreen} />
        ) : null}
        {accountScreen === "authentication" ? (
          <AuthenticationChange setAccountScreen={setAccountScreen} />
        ) : null}
        {accountScreen === "logout" ? (
          <ModalWrapper>
            {" "}
            <BasicModal
              modalText="Voulez-vous vraiment vous déconnecter ?"
              closeModal={() => setAccountScreen("menu")}
              actionYesButton={() => logout(false)}
              actionNoButton={() => setAccountScreen("menu")}
            />
          </ModalWrapper>
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
            <li>
              <button
                type="button"
                onClick={() => {
                  setAccountScreen("logout");
                }}
              >
                <LogoutIcon sx={{ color: "var(--main-color)" }} />
                <p>Se déconnecter</p>
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
