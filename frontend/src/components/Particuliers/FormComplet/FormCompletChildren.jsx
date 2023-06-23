import React from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import style from "./FormComplet.module.css";

export default function FormCompletChildren() {
  const { id } = useParams();
  return (
    <div>
      <Link to={`/particulier/${id}`}>
        <button type="button" className={style.button_back}>
          <ArrowBackIosNewIcon />
        </button>
      </Link>

      <div>
        <Link to={`/particulier/${id}/child`}>
          <button type="button">Enfants</button>
        </Link>
      </div>
      <div>
        <Link to={`/particulier/${id}/parent`}>
          <button type="button">Parents</button>
        </Link>
      </div>

      <div>
        <div>Dossier enfants</div>
      </div>
    </div>
  );
}
