import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import instance from "../../services/APIService";
import style from "./Image.module.css";

export default function ImageRead() {
  const { user } = useUserContext();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    instance
      .get(`/upload/${user.id}`)
      .then((response) => {
        setImageUrl(response.data.image_url);
      })

      .catch((err) => console.error(err));
  }, []);

  if (!imageUrl) return null;
  return (
    <div>
      <img
        src={`http://localhost:5000/uploads/${imageUrl}`}
        alt="profil_picture"
        className={style.profil_picture}
      />
    </div>
  );
}
