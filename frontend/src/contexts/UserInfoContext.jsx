import PropTypes from "prop-types";
import { createContext, useMemo, useContext, useState } from "react";

const UserInfoContext = createContext();

export default UserInfoContext;

export function UserInfoContextProvider({ children }) {
  const fieldsToComplete = [
    {
      field: "Informations de connexion",
      data: [
        { field: "mail_address", fieldname: "Adresse mail" },
        { field: "password", fieldname: "Mot de passe" },
        { field: "verifyPassword", fieldname: "Confirmez votre mot de passe" },
      ],
    },
    {
      field: "Nom de la structure",
      data: [{ field: "name", fieldname: "Nom de la structure" }],
    },
    {
      field: "Type de structure",
      data: [
        {
          field: "type",
          multiple: false,
          data: ["Micro-crèche", "Crèche associative", "Crèche publique"],
        },
      ],
    },
    {
      field: "Téléphone",
      data: [{ field: "phone_number", fieldname: "Numéro de téléphone" }],
    },
    {
      field: "Description",
      data: [{ field: "description", fieldname: "Description" }],
    },
    {
      field: "Adresse",
      data: [
        { field: "address", fieldname: "Numéro et nom de la voie" },
        { field: "postcode", fieldname: "Code postal" },
        { field: "city", fieldname: "Commune" },
      ],
    },
    {
      field: "Disponibilité",
      data: [
        {
          field: "disponibility",
          multiple: true,
          data: [
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
            "Dimanche",
          ],
        },
      ],
    },
    {
      field: "Nombre de places",
      data: [{ field: "places", fieldname: "Nombre de places" }],
    },
  ];

  const [activeField, setActiveField] = useState(null);

  const value = useMemo(
    () => ({
      fieldsToComplete,
      activeField,
      setActiveField,
    }),
    [activeField]
  );
  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfoContext = () => useContext(UserInfoContext);

UserInfoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
