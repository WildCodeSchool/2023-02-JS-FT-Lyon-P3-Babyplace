import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";

export default function ResumeChild() {
  const { user } = useUserContext();
  const [childs, setChilds] = useState(null);
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${backEndUrl}/parent/child/${user.id}`)
      .then((response) => {
        setChilds(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!childs) return null;
  return (
    <div>
      {childs.map((child) => (
        <div>
          <h3>Enfant:</h3>
          <div>
            {child.lastname} {child.firstname}
          </div>
          <div>Né(e) le: {child.birthdate}</div>

          <div>Médecin traitant: {child.doctor}</div>
          <div>{child.walking ? "Marcheur" : "Non marcheur"}</div>
        </div>
      ))}
    </div>
  );
}
