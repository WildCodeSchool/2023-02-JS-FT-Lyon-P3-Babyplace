import React from "react";
import { useReservationContext } from "../../../contexts/ReservationContext";

function ReservationConfirm() {
  const { reservation } = useReservationContext();

  return <div>{reservation.childName}</div>;
}

export default ReservationConfirm;
