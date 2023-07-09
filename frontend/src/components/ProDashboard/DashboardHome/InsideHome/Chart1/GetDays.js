import instance from "../../../../../services/APIService";

const getDays = () => {
  const arrayDays = [];
  instance
    .get(`/dashboard/days`)
    .then((response) => {
      arrayDays.push(response.data);
    })
    .catch((err) => console.error(err));
  console.info(arrayDays);
};

export default getDays;
