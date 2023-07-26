import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import instance from "../../../services/APIService";
import { useUserContext } from "../../../contexts/UserContext";
import styles from "./UploadImage.module.css";

export default function UploadImage({ setOpenModalUpload }) {
  const { user, login } = useUserContext();
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text);
  const [selectedFileName, setSelectedFileName] = useState("");

  const inputRef = useRef();

  const handleFiles = (files) => {
    const selectedFile = files[0];
    setSelectedFileName(selectedFile.name);
    inputRef.current.files = files;
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const selectedFile = inputRef.current.files[0];

    if (!selectedFile) {
      notifyFail("Selectionnez une photo à télecharger.");
      return;
    }

    const maxSize = 100 * 1024; // 100 KB (in bytes)
    if (selectedFile.size > maxSize) {
      notifyFail("La photo selectionnée dépasse la taille maximale : 100 KB.");
      return;
    }
    const formData = new FormData();
    formData.append("image", inputRef.current.files[0]);
    formData.append("id", user.id);

    instance
      .post(`upload`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        notifySuccess("Votre image à bien été enregistrée");
        setSelectedFileName("");
        login({ ...user, image: response.data.photoPath });
        setOpenModalUpload(false);
      })
      .catch((error) => {
        console.error(error);
        notifyFail("Un problème est survenu");
      });
  };

  return (
    <div className={styles.upload_container}>
      <div />
      <form
        className={styles.form_container}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          className={styles.image_input}
          type="file"
          name="image"
          id="input-file-upload"
          multiple
          onChange={handleChange}
        />
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            {selectedFileName && <p>Fichier sélectionné: {selectedFileName}</p>}{" "}
          </div>
        </label>
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
