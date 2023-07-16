const models = require("../models");

const add = (req, res, next) => {
  const id = req.payloads?.sub || req.proId;
  return models.proDisponibility
    .insert(req.body.disponibilitiesToAdd, id)
    .then(() => {
      return next();
    })
    .catch((err) => {
      console.error(err);
    });
};

const listProDisponibilities = (req, res, next) => {
  models.proDisponibility
    .findAll(req.user.id)
    .then(([result]) => {
      if (result) {
        const disponibilities = [];
        result.forEach((disponibility) => {
          disponibilities.push(disponibility.day);
        });
        req.user.disponibility = disponibilities;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const destroy = (req, res, next) => {
  const id = req.payloads.sub;
  models.proDisponibility
    .delete(req.body.disponibilitiesToRemove, id)
    .then(() => {
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next();
    });
  return next();
};

const GetAvailableDaysOfPro = async (req, res) => {
  const proId = parseInt(req.params.id, 10);

  const today = new Date();
  const tommorow = [
    `${today.getFullYear()}`,
    `${today.getMonth() + 1}`,
    `${today.getDate() + 1}`,
  ]
    .map((string) => (string.length === 1 ? `0${string}` : string))
    .join("-");

  try {
    const [daysOfThePro] = await models.proDisponibility.findAll(proId);

    const [[{ place }]] = await models.place.countPlaces(proId);

    const [thisDateIsFull] = await models.reservation.getFullDaysThisWeek(
      tommorow,
      proId,
      place
    );

    const futureDates = [];
    for (let i = 1; i <= 7; i += 1) {
      const futureDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i,
        today.getHours()
      );
      futureDates.push(futureDate);
    }

    const ArrayOfFullDays = [];
    thisDateIsFull.forEach((date) => {
      ArrayOfFullDays.push(date.thisDateIsFull);
    });

    const proAvailableDays = [];
    daysOfThePro.forEach((day) => {
      proAvailableDays.push(day.day);
    });

    const fullDays = [];

    for (let k = 0; k <= ArrayOfFullDays.length; k += 1) {
      if (ArrayOfFullDays[k] === "Monday") {
        fullDays.push("Lundi");
      } else if (ArrayOfFullDays[k] === "Tuesday") {
        fullDays.push("Mardi");
      } else if (ArrayOfFullDays[k] === "Wednesday") {
        fullDays.push("Mercredi");
      } else if (ArrayOfFullDays[k] === "Thursday") {
        fullDays.push("Jeudi");
      } else if (ArrayOfFullDays[k] === "Friday") {
        fullDays.push("Vendredi");
      } else if (ArrayOfFullDays[k] === "Saturday") {
        fullDays.push("Samedi");
      } else if (ArrayOfFullDays[k] === "Sunday") {
        fullDays.push("Dimanche");
      }
    }

    const daysOfTheWeek = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];

    const finalArray = [];

    proAvailableDays.forEach((day) => {
      if (fullDays.indexOf(day) === -1) {
        finalArray.push(day);
      }
    });

    const DaysToShow = [];

    futureDates.forEach((day) => {
      const dayToFind = day.getDay();
      if (finalArray.includes(daysOfTheWeek[dayToFind])) {
        const formattedDay = [
          `${day.getFullYear()}`,
          `${day.getMonth() + 1}`,
          `${day.getDate()}`,
        ]
          .map((string) => (string.length === 1 ? `0${string}` : string))
          .join("-");
        DaysToShow.push(formattedDay);
      }
    });

    res.send(DaysToShow);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne");
  }
};

module.exports = {
  add,
  listProDisponibilities,
  destroy,
  GetAvailableDaysOfPro,
};
