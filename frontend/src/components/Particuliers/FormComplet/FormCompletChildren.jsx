import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
            <NavLink
              to={`/particulier/${user.id}/child`}
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              <button type="button" className={style.button_child}>
                Enfants
              </button>
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`/particulier/${user.id}/parent`}
              className={({ isActive }) => (isActive ? style.active : "")}
            >
              <button type="button" className={style.button_parent}>
                Parents
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className={style.file}>
        <div className={style.button_head}>
          <button
            type="button"
            className={style.button}
            onClick={() => {
              setShowChild(!showChild);
              setShowForm(false);
            }}
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
        <div className={style.card_container}>
          {showChild ? <ResumeChild /> : null}
          {showForm ? <FormChild /> : null}
        </div>
      </div>
    </div>
  );
}
