import React from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import style from "./FormCompletChildrenParents.module.css";

export default function FormCompletParent() {
  const { id } = useParams();

  return (
    <div className={style.card}>
      <div className={style.header_card}>
        <Link to={`/particulier/${id}/child`}>
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
        <h2>Dossier parents</h2>
      </div>
    </div>
  );
}
