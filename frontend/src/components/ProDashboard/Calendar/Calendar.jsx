import { useState, useEffect } from "react";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import CalendarInfo from "./CalendarInfo";
import CalendarCard from "./CalendarCard";
// import { useUserInfoContext } from "../../../contexts/UserInfoContext";
import algoToFilterReservationsInCalendar from "./filterReservations";
import styles from "./Calendar.module.css";
import BadgeCalendar from "./BadgeCalendar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Calendar() {
  // const { user } = useUserInfoContext();
  const arrayFreeDays = [];
  const arrayBusyDays = [];
  const arrayFullDays = [];
  const [value, setValue] = useState(dayjs());
  const [dateOrder, setDateOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [thisMonth, setThisMonth] = useState(dayjs());
  const maxProSlot = 20;

  // --------------------------------------------------------------------
  const actualMonth = thisMonth.format("MM");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/dashboard/overview/calendar/${actualMonth}`)
      .then((result) => {
        setAllOrders(result.data);
      })
      .catch((err) => console.error(err));
  }, [thisMonth]);

  algoToFilterReservationsInCalendar(
    allOrders,
    arrayFreeDays,
    arrayBusyDays,
    arrayFullDays,
    maxProSlot
  );

  // --------------------------------------------------------------------
  const date = value.format("YYYY-MM-DD"); // Formatage de la date

  // Le useEffect sert à afficher les réservations à la date sur laquelle on clique sur le calendrier
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/dashboard/calendar/${date}`)
      .then((res) => {
        setDateOrder(res.data);
      })
      .catch((err) => console.error(err));
  }, [date]);
  // ----------------------------------------------------------------------

  return (
    <div className={styles.calendar_box}>
      <div className={styles.left_container}>
        <CalendarInfo />
        <div className={styles.calendar_component}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            <StaticDatePicker
              orientation="portrait"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              onMonthChange={(newMonth) => {
                setThisMonth(newMonth);
              }}
              slots={{
                day: BadgeCalendar,
              }}
              slotProps={{
                actionBar: {
                  actions: [],
                },
                tabs: {
                  hidden: true,
                },
                toolbar: {
                  hidden: true,
                },
                shortcuts: {
                  hidden: true,
                },
                day: {
                  freeDays: arrayFreeDays,
                  busyDays: arrayBusyDays,
                  fullDays: arrayFullDays,
                },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className={styles.right_container}>
        <h1>{`${dateOrder.length} / ${maxProSlot}`}</h1>
        {dateOrder.map((orderDate) => (
          <CalendarCard key={orderDate.id} data={orderDate} />
        ))}
      </div>
    </div>
  );
}
