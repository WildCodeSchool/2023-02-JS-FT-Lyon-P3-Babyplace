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
import styles from "./Chart3.module.css";

import instance from "../../../../../services/APIService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart3() {
  const [arrayDays, setArrayDays] = useState([]);
  useEffect(() => {
    instance
      .get(`/dashboard/days`)
      .then((response) => {
        setArrayDays(response.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const days = [];
  arrayDays.forEach((day) => {
    days.push(day.day);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = days;

  const data = {
    labels,
    datasets: [
      {
        label: "Places utilisées / total des places",
        data: [41, 29, 38, 40, 62, 0, 0],
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
