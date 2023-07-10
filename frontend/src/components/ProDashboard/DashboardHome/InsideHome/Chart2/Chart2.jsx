import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styles from "./Chart2.module.css";
import BabyplaceBg from "../../../../../assets/images/Babyplace-2.png";
import instance from "../../../../../services/APIService";
import { useUserContext } from "../../../../../contexts/UserContext";
import TransformData from "./TransformDatas";

export default function Chart2() {
  const { user } = useUserContext();
  const [data, setData] = useState([]);
  const [waitingOrders, setWaitingOrders] = useState(null);
  const [getDate] = useState(dayjs());
  const date = getDate.format("YYYY-MM-DD");

  useEffect(() => {
    instance
      .get(`/dashboard/chart/${date}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    instance
      .get(`/dashboard/waiting-order`)
      .then((response) => {
        setWaitingOrders(response.data.orders);
      })
      .catch((err) => console.error(err));
  }, []);

  TransformData(data);
  return (
    <div className={styles.chart2_container}>
      <p>
        Nombre d'enfants aujourd'hui :<span>/ {user.place}</span>{" "}
      </p>
      <p>
        Enfant(s) non marcheur :<span>555</span>{" "}
      </p>
      <p>
        Enfants inscrit à la cantine :<span>555</span>{" "}
      </p>
      <p>
        Réservations en attente :<span>{waitingOrders}</span>{" "}
      </p>
      <div className={styles.img_box}>
        <img src={BabyplaceBg} alt="Babyplace Backgound" />
      </div>
    </div>
  );
}
