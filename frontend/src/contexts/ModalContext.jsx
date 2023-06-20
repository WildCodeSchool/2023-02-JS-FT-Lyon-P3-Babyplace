import PropTypes from "prop-types";
import { createContext, useState, useMemo, useContext } from "react";

const ModalContext = createContext();

export default ModalContext;

export function ModalContextProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  const value = useMemo(
    () => ({
      openModal,
      setOpenModal,
    }),
    [openModal, setOpenModal]
  );
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
