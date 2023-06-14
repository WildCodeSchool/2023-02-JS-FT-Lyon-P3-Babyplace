import React from "react";
import styles from "./Login.module.css";
import DesignWelcome from "./DesignWelcome";

function Login() {
  return (
    <div className={styles.login}>
      <DesignWelcome />
      <div className={styles.loginForm}>
        <h1>Login ici</h1>
      </div>
    </div>
  );
}

export default Login;
