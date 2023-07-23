// Fonction qui filtre les réservations dans le calendrier en fonction de leur nombre
// Paramètres :
// - allOrders : tableau contenant toutes les commandes/réservations
// - arrayFreeDays : tableau qui recevra les jours avec peu de réservations
// - arrayBusyDays : tableau qui recevra les jours avec un nombre de réservations égal ou supérieur à la moitié de maxProSlot
// - arrayFullDays : tableau qui recevra les jours avec le nombre maximum de réservations (maxProSlot)
// - maxProSlot : nombre maximum de réservations qu'un jour peut avoir
const algoToFilterReservationsInCalendar = (
  allOrders,
  arrayFreeDays,
  arrayBusyDays,
  arrayFullDays,
  maxProSlot
) => {
  // Vérification si le tableau des réservations est défini (non-null et non-undefined)
  if (!allOrders) {
    return;
  }

  // Création d'un tableau pour stocker les jours des réservations
  const arrayOfDay = [];
  // Parcours de toutes les réservations pour extraire les jours et les stocker dans arrayOfDay
  allOrders.forEach((reservation) => {
    arrayOfDay.push(parseInt(reservation.date_reservation, 10));
  });

  // Création d'un objet Map pour compter le nombre d'occurrences de chaque jour
  const countMap = new Map();

  // Parcours du tableau des jours
  for (const value of arrayOfDay) {
    // Vérification si la valeur (jour) existe déjà dans le Map
    if (countMap.has(value)) {
      // Si la valeur existe déjà dans le Map, on incrémente son compteur de 1
      countMap.set(value, countMap.get(value) + 1);
    } else {
      // Sinon, on initialise son compteur à 1, car c'est la première occurrence de ce jour
      countMap.set(value, 1);
    }
  }

  // Calcul de la moitié de maxProSlot
  const halfMaxPlace = maxProSlot / 2;

  // Parcours du Map pour classer les jours en fonction de leur nombre de réservations
  countMap.forEach((count, value) => {
    if (count === maxProSlot) {
      // Si le nombre de réservations pour ce jour est égal à maxProSlot, on l'ajoute à arrayFullDays
      arrayFullDays.push(value);
    } else if (count >= halfMaxPlace && count <= maxProSlot - 1) {
      // Si le nombre de réservations est entre la moitié de maxProSlot et maxProSlot-1, on l'ajoute à arrayBusyDays
      arrayBusyDays.push(value);
    } else if (count < halfMaxPlace) {
      // Si le nombre de réservations est inférieur à la moitié de maxProSlot, on l'ajoute à arrayFreeDays
      arrayFreeDays.push(value);
    }
  });
};

export default algoToFilterReservationsInCalendar;
