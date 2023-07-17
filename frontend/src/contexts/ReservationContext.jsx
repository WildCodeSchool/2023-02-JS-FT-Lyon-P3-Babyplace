import PropTypes from "prop-types";
import { createContext, useMemo, useContext, useState } from "react";

const ReservationContext = createContext();

export default ReservationContext;

export function ReservationContextProvider({ children }) {
  const [reservation, setReservation] = useState({});
  const value = useMemo(
    () => ({
      reservation,
      setReservation,
    }),
    [reservation]
  );
  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservationContext = () => useContext(ReservationContext);

ReservationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
