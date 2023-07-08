const algoToFilterReservationsInCalendar = (
  allOrders,
  arrayFreeDays,
  arrayBusyDays,
  arrayFullDays,
  maxProSlot
) => {
  if (!allOrders) {
    return;
  }
  const arrayOfDay = [];
  console.info(allOrders);
  allOrders.forEach((reservation) => {
    arrayOfDay.push(parseInt(reservation.date_reservation, 10));
  });
  console.info(arrayOfDay);
  const countMap = new Map();

  // Parcours du tableau
  for (const value of arrayOfDay) {
    if (countMap.has(value)) {
      // Si la valeur existe déjà dans le Map, on incrémente son compteur
      countMap.set(value, countMap.get(value) + 1);
    } else {
      // Sinon, on initialise son compteur à 1
      countMap.set(value, 1);
    }
  }

  // Affichage des résultats
  countMap.forEach((count, value) => {
    console.info(`La valeur ${value} apparaît ${count} fois.`);
    if (count === maxProSlot) {
      arrayFullDays.push(value);
    } else if (count >= 10 && count <= 19) {
      arrayBusyDays.push(value);
    } else if (count < 10) {
      arrayFreeDays.push(value);
    }
  });
};

export default algoToFilterReservationsInCalendar;
