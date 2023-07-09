import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styles from "./Chart2.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);
Chart.defaults.color = "black";

const data = {
  labels: ["En attente", "Acceptés", "Refusé", "Annulées"],
  datasets: [
    {
      data: [10, 65, 20, 5],
      backgroundColor: [
        "rgba(91, 172, 204, 0.5)",
        "rgba(100, 176, 100, 0.5)",
        "rgba(241, 87, 87, 0.5)",
        "rgba(113, 113, 113, 0.5)",
      ],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
};

export default function Chart2() {
  return (
    <div className={styles.chart2_container}>
      <div className={styles.chart2}>
        <p>État de mes réservations</p>
        <Doughnut data={data} />
      </div>
    </div>
  );
}
