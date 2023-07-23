import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import styles from "./OccupationChart.module.css";
import instance from "../../../../../services/APIService";
import { useUserContext } from "../../../../../contexts/UserContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart3() {
  const { user } = useUserContext();
  const [arrayDays, setArrayDays] = useState([]);
  const [occupationRate, setOccoupationRate] = useState([]);
  const [getDate] = useState(dayjs());
  const thisDate = getDate.format("YYYY-MM-DD");

  useEffect(() => {
    instance
      .get(`/dashboard/days`)
      .then((response) => {
        setArrayDays(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Extraction des jours depuis arrayDays et stockage dans la variable days
  const days = [];
  arrayDays.forEach((day) => {
    days.push(day.day);
  });

  // useEffect pour récupérer le taux d'occupation pour la date courante depuis le backend
  useEffect(() => {
    instance
      .get(`/occupation/${thisDate}`)
      .then((response) => {
        setOccoupationRate(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Extraction des dates et taux d'occupation depuis occupationRate et stockage dans les tableaux dayArray et occupation
  const dayArray = [];
  const occupation = [];
  occupationRate.forEach((date) => {
    dayArray.push(date.date);
    occupation.push((date.total / user.place) * 100);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = dayArray;

  const data = {
    labels,
    datasets: [
      {
        label: "Places utilisées / total des places (en %)",
        data: occupation,
        backgroundColor: "#c299ff",
      },
    ],
  };

  return (
    <div className={styles.chart3_container}>
      <div className={styles.chart3}>
        <p>Taux d'occupation hebdomadaire</p>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
