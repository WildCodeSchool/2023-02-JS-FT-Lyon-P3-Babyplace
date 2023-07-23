import { useUserContext } from "../../../../../contexts/UserContext";
import style from "./Image.module.css";

export default function ImageRead() {
  const { user } = useUserContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const imagePath = `${BACKEND_URL}/uploads/${user.image}`;

  return (
    <div>
      {imagePath && (
        <img
          src={imagePath}
          alt="profil_picture"
          className={style.profil_picture}
        />
      )}
    </div>
  );
}