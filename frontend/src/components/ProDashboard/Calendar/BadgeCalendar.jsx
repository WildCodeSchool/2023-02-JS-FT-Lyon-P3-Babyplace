import PropTypes from "prop-types";
import * as React from "react";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

// 🔴 🟢  🟠

// Définition du composant BadgeCalendar
export default function BadgeCalendar(props) {
  // Déstructuration des props pour obtenir les valeurs de freeDays, busyDays, fullDays, day et outsideCurrentMonth
  const { freeDays, busyDays, fullDays, day, outsideCurrentMonth, ...other } =
    props;

  // Vérifier si la date courante est un jour libre (free), un jour occupé (busy), ou un jour complet (full)
  const free = !outsideCurrentMonth && freeDays.indexOf(day.date()) >= 0;
  const busy = !outsideCurrentMonth && busyDays.indexOf(day.date()) >= 0;
  const full = !outsideCurrentMonth && fullDays.indexOf(day.date()) >= 0;

  // Détermination du contenu du badge en fonction du statut du jour (free, busy, full)
  let badgeContent;
  if (free) {
    badgeContent = "🟢"; // Emoji vert pour les jours libres
  } else if (busy) {
    badgeContent = "🟠"; // Emoji orange pour les jours occupés
  } else if (full) {
    badgeContent = "🔴"; // Emoji rouge pour les jours complets
  }

  // Rendu du composant Badge avec le contenu approprié
  return (
    <Badge key={day.toString()} overlap="circular" badgeContent={badgeContent}>
      {/* Rendu du composant PickersDay avec les props restantes et les props spécifiques */}
      <PickersDay
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other} // Props restantes passées via le spread operator
        outsideCurrentMonth={outsideCurrentMonth} // Prop spécifique pour indiquer si le jour est en dehors du mois courant
        day={day} // Prop spécifique contenant l'objet représentant la date du jour
      />
    </Badge>
  );
}

// Définition des prop types pour le composant BadgeCalendar
BadgeCalendar.propTypes = {
  freeDays: PropTypes.arrayOf(PropTypes.number), // Liste des jours libres (tableau de nombres)
  busyDays: PropTypes.arrayOf(PropTypes.number), // Liste des jours occupés (tableau de nombres)
  fullDays: PropTypes.arrayOf(PropTypes.number), // Liste des jours complets (tableau de nombres)
  day: PropTypes.shape, // Objet représentant la date du jour
  outsideCurrentMonth: PropTypes.bool, // Indicateur si le jour est en dehors du mois courant (booléen)
};

// Définition des valeurs par défaut pour les props du composant BadgeCalendar
BadgeCalendar.defaultProps = {
  freeDays: null, // Par défaut, pas de jours libres spécifiés
  busyDays: null, // Par défaut, pas de jours occupés spécifiés
  fullDays: null, // Par défaut, pas de jours complets spécifiés
  day: null, // Par défaut, pas de date spécifiée
  outsideCurrentMonth: null, // Par défaut, pas de statut pour le mois courant spécifié
};
