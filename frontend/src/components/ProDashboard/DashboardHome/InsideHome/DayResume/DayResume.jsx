import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styles from "./DayResume.module.css";
import BabyplaceBg from "../../../../../assets/images/Babyplace-2.png";
import instance from "../../../../../services/APIService";
import { useUserContext } from "../../../../../contexts/UserContext";

export default function Chart2() {
  const { user } = useUserContext();
  const [data, setData] = useState([]);
  const [waitingOrders, setWaitingOrders] = useState(null);
  const [getDate] = useState(dayjs());
  const date = getDate.format("YYYY-MM-DD");
  let ChildrensWalking = 0;

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

  data.forEach((child) => {
    if (child.walking) {
      ChildrensWalking += 1;
    }
  });

  return (
    <div className={styles.chart2_container}>
      <p>
        Nombre d'enfants aujourd'hui :
        <span>
          {data.length} / {user.place}
        </span>{" "}
      </p>
      <p>
        Enfant(s) marcheur :<span>{ChildrensWalking}</span>{" "}
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
