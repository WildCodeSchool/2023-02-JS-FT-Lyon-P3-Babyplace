import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./Chart1.module.css";
import getDays from "./GetDays";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

getDays();

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "black",
      },
    },
    tooltip: {
      bodyColor: "white",
    },
  },
  scales: {
    y: {
      ticks: {
        color: "black",
      },
    },
    x: {
      ticks: {
        color: "black",
      },
    },
  },
};

const labels = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Résultat",
      data: [30, 36, 39, 46, 51, 60, 64],
      borderColor: "#c299ff",
      backgroundColor: "#c299ff",
    },
    {
      label: "Prévisions",
      data: [40, 45, 50, 50, 55, 55, 55],
      borderColor: "#8080ff",
      backgroundColor: "#8080ff",
    },
  ],
};

export default function Chart1() {
  return (
    <div className={styles.chart1_container}>
      <div className={styles.chart1}>
        <p>Recettes mensuelle</p>
        <Line options={options} data={data} className={styles.inside_chart} />
      </div>
    </div>
  );
}
