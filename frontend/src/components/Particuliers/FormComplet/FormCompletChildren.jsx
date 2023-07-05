import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import style from "./FormCompletChildrenParents.module.css";
import FormChild from "./FormChild";
import ResumeChild from "./ResumeChild";

export default function FormCompletChildren() {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [showChild, setShowChild] = useState(false);

  return (
    <div className={style.card}>
      <div className={style.header_card}>
        <Link to={`/particulier/${id}`}>
          <button type="button" className={style.button_back}>
            <ArrowBackIosNewIcon />
          </button>
        </Link>
        <div className={style.buttons}>
          <div>
            <Link to={`/particulier/${id}/child`}>
              <button type="button" className={style.buttonChild}>
                Enfants
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/particulier/${id}/parent`}>
              <button type="button" className={style.buttonParent}>
                Parents
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={style.file}>
        <h2>Dossier enfants</h2>
        <div>
          <button
            type="button"
            className={style.button}
            onClick={() => setShowChild(!showChild)}
          >
            Mes enfants
          </button>
          {showChild ? <ResumeChild /> : null}
          <button
            type="button"
            className={style.button}
            onClick={() => setShowForm(!showForm)}
          >
            Ajouter un enfant
          </button>
          {showForm ? <FormChild /> : null}
        </div>
      </div>
    </div>
  );
}
