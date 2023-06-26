import PropTypes from "prop-types";
import { createContext, useState, useMemo, useContext } from "react";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
    }),
    [user, token]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
