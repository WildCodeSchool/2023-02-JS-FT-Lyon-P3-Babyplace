import PropTypes from "prop-types";
import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import styles from "./Login.module.css";
import DesignWelcome from "./DesignWelcome";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login({ userType }) {
  const [loginInfo, setLoginInfo] = useState({});

  const validateLogin = () => {
    return true;
  };

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateLogin) {
      axios.post(`${BACKEND_URL}/${userType}/login`);
    }
    // console.log(loginInfo);
  };

  return (
    <div className={styles.login}>
      <DesignWelcome />
      <div className={styles.loginForm}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <div className={styles.field}>
            <p>Email :</p>
            <TextField
              required
              name="email"
              id="outlined-required"
              label="Enter your email address"
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <p>Password :</p>
            <TextField
              required
              name="password"
              id="outlined-required"
              label="Enter your password"
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Je me connecte
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Login;

Login.propTypes = {
  userType: PropTypes.string.isRequired,
};
