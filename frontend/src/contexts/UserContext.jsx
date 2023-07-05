import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import instance from "../services/APIService";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) navigate("/");
  }, [user?.id]);

  const login = (_user) => {
    setUser(_user);
  };

  const logout = () => {
    instance.get("/logout");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      login,
      logout,
    }),
    [user, token]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
