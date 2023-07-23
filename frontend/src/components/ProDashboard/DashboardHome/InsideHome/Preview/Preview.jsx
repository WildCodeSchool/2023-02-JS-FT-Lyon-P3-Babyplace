import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import DispoProPreview from "./DispoProPreview";
import style from "./Preview.module.css";
import ImageRead from "./ImageRead";
import instance from "../../../../../services/APIService";

export default function Preview() {
  const [pro, setPro] = useState([]);

  useEffect(() => {
    instance
      .get(`/dashboard/preview`)
      .then((response) => setPro(response.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      {pro && (
        <div className={style.card_global}>
          <div className={style.card_left}>
            <div className={style.image}>
              <ImageRead />
            </div>
            <h3>Présentation</h3>
            <p>{pro.description}</p>
          </div>
          <div className={style.card_bottom}>
            <div className={style.informations}>
              <InfoIcon />
              <div className={style.tel_mail}>
                <p>Téléphone: {pro.phone_number}</p>
                <p>Mail: {pro.mail_address}</p>
              </div>
            </div>
            <div>
              <h3>Disponibilités</h3>
              <DispoProPreview />
              <div className={style.button_reservation}>
                <button type="button" className={style.button}>
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
