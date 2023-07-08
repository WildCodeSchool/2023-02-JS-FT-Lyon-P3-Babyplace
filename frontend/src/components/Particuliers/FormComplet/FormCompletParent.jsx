import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormCompletChildrenParents.module.css";
import FormParent from "../Form/FormParent";

export default function FormCompletParent() {
  const { user } = useUserContext();

  return (
    <div className={style.page}>
      <div className={style.header_card}>
        <Link to={`/particulier/${user.id}/child`}>
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
        <h2>Dossier parents</h2>
        <div className={style.form_parent}>
          <FormParent />
        </div>
      </div>
    </div>
  );
}
