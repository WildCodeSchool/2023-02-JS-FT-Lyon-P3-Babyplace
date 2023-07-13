import PropTypes from "prop-types";
import { createContext, useMemo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import instance from "../services/APIService";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);
  const [userChildren, setUserChildren] = useState(null);
  const [token, setToken] = useLocalStorage("token", "");
  const [sessionWarning, setSessionWarning] = useState(null);
  const [pendingReservation, setPendingReservation] = useState(null);
  const navigate = useNavigate();

  const login = (_user) => {
    setUser(_user);
    setSessionWarning(null);
  };

  const logout = (sessionExpired) => {
    instance.get("/logout");
    setUser(null);
    setToken(null);
    navigate("/");
    if (sessionExpired === true) {
      setSessionWarning("Votre session a expiré. Veuillez vous reconnecter.");
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      login,
      logout,
      sessionWarning,
      setSessionWarning,
      userChildren,
      setUserChildren,
      pendingReservation,
      setPendingReservation,
    }),
    [user, token, sessionWarning, userChildren, pendingReservation]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
