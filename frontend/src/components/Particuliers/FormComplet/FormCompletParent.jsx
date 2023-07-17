import React, { useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormCompletChildrenParents.module.css";
import FormParent from "../Form/FormParent";

export default function FormCompletParent() {
  const { user } = useUserContext();
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
        <div className={style.form_parent}>
          <FormParent />
        </div>
      </div>
    </div>
  );
}
