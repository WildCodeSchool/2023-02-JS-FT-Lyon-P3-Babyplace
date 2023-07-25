import React, { useEffect, useState } from "react";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";
import style from "./FormCompletChildrenParents.module.css";

export default function ResumeChild() {
  const { user } = useUserContext();
  const [childs, setChilds] = useState(null);

  useEffect(() => {
    instance
      .get(`/parent/child/${user.id}`)
      .then((response) => {
        setChilds(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!childs) return null;
  return (
    <div className={style.animation_div}>
      <div className={style.cards_child}>
        {childs.map((child) => (
          <div className={style.card_child}>
            <h3>Enfant:</h3>
            <div>
              <h4>
                {child.lastname} {child.firstname}
              </h4>
            </div>
            <div>Né(e) le: {child.birthdate}</div>

            <div>Médecin traitant: {child.doctor}</div>
            <div>{child.walking === 1 ? "Marcheur" : "Non marcheur"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
