import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormCompletChildrenParents.module.css";
import FormChild from "./FormChild";
import ResumeChild from "./ResumeChild";

export default function FormCompletChildren() {
  const { user } = useUserContext();
  const [showForm, setShowForm] = useState(false);
  const [showChild, setShowChild] = useState(true);

  return (
    <div className={style.page}>
      <div className={style.header_card}>
        <Link to={`/particulier/${user.id}`}>
          <button type="button" className={style.button_back}>
            <ArrowBackIosNewIcon />
          </button>
        </Link>
        <div className={style.buttons}>
          <div>
            <Link to={`/particulier/${user.id}/child`}>
              <button type="button" className={style.buttonChild}>
                Enfants
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/particulier/${user.id}/parent`}>
              <button type="button" className={style.buttonParent}>
                Parents
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={style.file}>
        <h2>Dossier enfants</h2>
        <div className={style.button_head}>
          <button
            type="button"
            className={style.button}
            onClick={() => setShowChild(!showChild)}
          >
            Mes enfants
          </button>
          <button
            type="button"
            className={style.button}
            onClick={() => {
              setShowForm(!showForm);
              setShowChild(false);
            }}
          >
            Ajouter un enfant
          </button>
        </div>
        {showChild ? <ResumeChild /> : null}
        {showForm ? <FormChild /> : null}
      </div>
    </div>
  );
}
