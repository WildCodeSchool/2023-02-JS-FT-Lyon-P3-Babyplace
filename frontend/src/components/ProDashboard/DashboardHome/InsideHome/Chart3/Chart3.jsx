import React from "react";
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

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

export default function Chart3() {
  return (
    <div className={styles.chart3_container}>
      <div className={styles.chart3}>
        <p>Taux d'occupation hebdomadaire</p>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
