import PropTypes from "prop-types";
import { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import styles from "./UploadImage.module.css";
import instance from "../../../services/APIService";

export default function UploadImage({ setOpenModalUpload }) {
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = () => toast.error("Un problème est survenu");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", inputRef.current.files[0]);

    instance
      .post("/ma route pour envoyer mon image/", formData)
      .then((res) => {
        if (res.status === 200) {
          notifySuccess("Votre image à bien été enregistrée");
        } else {
          notifyFail();
        }
      })
      .catch((err) => console.error(err));
    setOpenModalUpload(false);
  };

  return (
    <div className={styles.upload_container}>
      <div className={styles.image_box} />
      <form
        className={styles.form_container}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          className={styles.image_input}
          type="file"
          name="monfichier"
          ref={inputRef}
        />
        <Button variant="contained" sx={{ my: 4 }} type="submit">
          Envoyer
        </Button>
      </form>
    </div>
  );
}

UploadImage.propTypes = {
  setOpenModalUpload: PropTypes.func.isRequired,
};
