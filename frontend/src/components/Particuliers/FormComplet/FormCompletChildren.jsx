import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormCompletChildrenParents.module.css";
import FormChild from "./FormChild";
import ResumeChild from "./ResumeChild";

export default function FormCompletChildren() {
  const { user } = useUserContext();
  const [activeField, setActiveField] = useState("children");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id || user?.role === "pro") {
      navigate("/particulier");
    }
  }, []);

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
              to={`/particulier/${user.id}/enfant`}
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
              setActiveField("children");
            }}
          >
            Mes enfants
          </button>
          <button
            type="button"
            className={style.button}
            onClick={() => {
              setActiveField("add");
            }}
          >
            Ajouter un enfant
          </button>
        </div>
        <div className={style.card_container}>
          {activeField === "children" ? <ResumeChild /> : null}
          {activeField === "add" ? <FormChild /> : null}
        </div>
      </div>
    </div>
  );
}
