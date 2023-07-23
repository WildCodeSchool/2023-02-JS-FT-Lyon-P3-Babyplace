import React from "react";
import styles from "./AccountHeader.module.css";
import avatar from "../../../assets/images/avatar_Babyplace.jpg";
import { useUserContext } from "../../../contexts/UserContext";

function AccountHeader() {
  const { user } = useUserContext();
  return (
    <div className={styles.header}>
      <div className={styles.avatarWrap}>
        <img className={styles.avatar} src={avatar} alt="avatar" />
      </div>
      <div className={styles.name}>
        <h1>{user.firstname}</h1>
        <h1>{user.lastname}</h1>
      </div>
    </div>
  );
}

export default AccountHeader;
