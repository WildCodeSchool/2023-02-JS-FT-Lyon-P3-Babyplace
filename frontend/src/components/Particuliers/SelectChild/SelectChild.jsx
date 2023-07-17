import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { ToastContainer, toast } from "react-toastify";
import instance from "../../../services/APIService";
import styles from "./SelectChild.module.css";
import { useUserContext } from "../../../contexts/UserContext";
import { useReservationContext } from "../../../contexts/ReservationContext";
import "react-toastify/dist/ReactToastify.css";

function SelectChild() {
  const { userChildren, logout } = useUserContext();
  const { reservation, setReservation } = useReservationContext();
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const notifyFail = (text) => toast.error(text);
  const navigate = useNavigate();

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    if (reservation.completed) {
      navigate("/particulier/recherche");
      setReservation({});
    }
  }, []);

  useEffect(() => {
    if (message) {
      notifyFail(message);
      setMessage(null);
    }
  }, [message]);

  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      setReservation({ ...reservation, child: value });
      const childName = `${
        userChildren.find((child) => child.id === parseInt(value, 10)).firstname
      } ${
        userChildren.find((child) => child.id === parseInt(value, 10)).lastname
      }`;
      instance
        .post("/parent/reservation", { ...reservation, childId: value })
        .then((response) => {
          if (response.status === 201) {
            setReservation({ ...reservation, childName, completed: true });
            return navigate("/particulier/reservation/confirmation");
          }
          return setMessage(response.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            logout(true);
          }
          console.warn(err);
          return setMessage(err.data);
        });
      setValue(null);
    }
  };

  return (
    <div className={styles.selectChildScreen}>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.button_back}
      >
        <ArrowBackIosNewIcon />
      </button>
      <div className={styles.title}>
        <h1>Réservation</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <h2>
              {" "}
              Sélectionnez l'enfant que vous souhaitez faire garder chez{" "}
              {reservation.proName} le{" "}
              {reservation.date.toLocaleString("fr-FR", options)} :
            </h2>
            <FormControl>
              <RadioGroup
                value={value}
                onChange={(e) => handleRadioChange(e)}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {userChildren &&
                  userChildren.map((child) => {
                    return (
                      <FormControlLabel
                        key={child.id}
                        value={child.id}
                        control={<Radio />}
                        label={`${child.firstname} ${child.lastname}`}
                      />
                    );
                  })}
              </RadioGroup>
              <button
                type="submit"
                disabled={!value}
                className={value ? styles.button : styles.disabledButton}
              >
                Valider la réservation
              </button>
            </FormControl>
          </form>
          <div className={styles.disclaimer}>
            <p>En envoyant ma demande de réservation, j'accepte :</p>
            <p>- Le réglement intérieur de la structure</p>
            <p>
              - d'envoyer mon dossier d'inscripton et mes informations à la
              crèche
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectChild;
