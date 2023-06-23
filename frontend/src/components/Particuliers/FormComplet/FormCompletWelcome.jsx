import React from "react";
import { Link, useParams } from "react-router-dom";
import style from "./FormComplet.module.css";

export default function FormCompletWelcome() {
  const { id } = useParams();
  return (
    <div>
      <div>
        <div className={style.header_card}>
          <div>
            <Link to={`/particulier/${id}/child`}>
              <button type="button">Dossier enfant</button>
            </Link>
          </div>
          <div>
            <Link to={`/particulier/${id}/parent`}>
              <button type="button">Dossier parent</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
