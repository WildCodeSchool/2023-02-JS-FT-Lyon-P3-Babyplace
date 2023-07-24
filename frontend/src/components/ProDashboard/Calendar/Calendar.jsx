import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import CalendarInfo from "./CalendarInfo";
import CalendarCard from "./CalendarCard";
import { useUserContext } from "../../../contexts/UserContext";
import algoToFilterReservationsInCalendar from "./filterReservations";
import styles from "./Calendar.module.css";
import BadgeCalendar from "./BadgeCalendar";
import instance from "../../../services/APIService";

export default function Calendar() {
  const { user } = useUserContext();
  const arrayFreeDays = [];
  const arrayBusyDays = [];
  const arrayFullDays = [];
  const [value, setValue] = useState(dayjs());
  const [dateOrder, setDateOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [thisMonth, setThisMonth] = useState(dayjs());
  const maxProSlot = user.place;

  // --------------------------------------------------------------------
  // dans le code suivant, on récupère toutes les réservations du mois actuellement sélectionné
  // la requête se relance lorsque qu'on change de mois en cliquant sur le bouton du calendrier
  const actualMonth = thisMonth.format("MM");
  useEffect(() => {
    instance
      .get(`/dashboard/overview/calendar/${actualMonth}`)
      .then((result) => {
        setAllOrders(result.data);
      })
      .catch((err) => console.error(err));
  }, [thisMonth]);

  // cette fonction traite les réservations reçu dans la requête précedente pour les ranger dans un tableau
  // en fonction du nombre de réservation par jour par rapport au nombre de places max de ce pro
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
    instance
      .get(`/dashboard/calendar/${date}`)
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
          {/* Wrapper pour la localisation */}
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            {/* Composant de sélection de date statique */}
            <StaticDatePicker
              orientation="portrait" // Orientation du sélecteur de date (portrait)
              value={value} // Valeur de la date sélectionnée (peut être un objet de date)
              onChange={(newValue) => {
                setValue(newValue); // Fonction de gestionnaire pour mettre à jour la date sélectionnée lorsqu'elle change
              }}
              onMonthChange={(newMonth) => {
                setThisMonth(newMonth); // Fonction de gestionnaire pour mettre à jour le mois actuel lorsqu'il change
              }}
              slots={{
                day: BadgeCalendar, // Utilisation du composant BadgeCalendar pour afficher chaque jour dans le sélecteur de date
              }}
              slotProps={{
                actionBar: {
                  actions: [], // Actions à afficher dans la barre d'action (vide ici, pas d'actions spécifiées)
                },
                tabs: {
                  hidden: true, // Cacher les onglets dans le sélecteur de date (true pour les cacher)
                },
                toolbar: {
                  hidden: true, // Cacher la barre d'outils dans le sélecteur de date (true pour la cacher)
                },
                shortcuts: {
                  hidden: true, // Cacher les raccourcis de date dans le sélecteur de date (true pour les cacher)
                },
                day: {
                  // Props spécifiques pour le composant BadgeCalendar utilisé pour afficher chaque jour
                  freeDays: arrayFreeDays, // Liste des jours libres (un tableau d'objets date)
                  busyDays: arrayBusyDays, // Liste des jours occupés (un tableau d'objets date)
                  fullDays: arrayFullDays, // Liste des jours complets (un tableau d'objets date)
                },
              }}
            />
          </LocalizationProvider>
        </div>
        ;
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
