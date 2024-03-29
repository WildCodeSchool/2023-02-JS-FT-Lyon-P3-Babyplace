import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useReservationContext } from "../../../contexts/ReservationContext";
import { useUserContext } from "../../../contexts/UserContext";

function Reservation() {
  const navigate = useNavigate();
  const { reservation, setReservation } = useReservationContext();
  const { user } = useUserContext();

  useEffect(() => {
    if (
      !user?.id ||
      user?.role === "pro" ||
      !reservation.proId ||
      !reservation.date
    ) {
      navigate("/particulier");
    }
    return () => {
      setReservation({});
    };
  }, []);

  if (user?.role === "pro") {
    return null;
  }
  if (!reservation.proId || !reservation.date) {
    return null;
  }

  return <Outlet />;
}

export default Reservation;
