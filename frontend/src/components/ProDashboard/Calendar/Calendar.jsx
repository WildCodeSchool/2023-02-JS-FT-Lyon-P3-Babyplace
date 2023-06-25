import { useState, useEffect } from "react";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import DatePicker from "./CalendarInfo";
import CalendarCard from "./CalendarCard";
import styles from "./Calendar.module.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Calendar() {
  const [value, setValue] = useState(dayjs());
  const [dateOrder, setDateOrder] = useState([]);
  const month = value.$M + 1;
  const getMonth = () => {
    if (month >= 0 || month <= 10) {
      return `0${month}`;
    }
    if (month > 10 || month <= 12) {
      return month;
    }
    return null;
  };

  const date = `${value.$y}-${getMonth()}-${value.$D}`;
  // console.info(value);
  console.info(date);
  console.info(dateOrder);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/dashboard/calendar/${date}`)
      .then((res) => {
        setDateOrder(res.data);
      })
      .catch((err) => console.error(err));
  }, [date]);

  return (
    <div className={styles.calendar_box}>
      <div className={styles.left_container}>
        <DatePicker />
        <div className={styles.calendar_component}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              orientation="portrait"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className={styles.right_container}>
        {dateOrder.map((orderDate) => (
          <CalendarCard key={orderDate.id} data={orderDate} />
        ))}
      </div>
    </div>
  );
}
