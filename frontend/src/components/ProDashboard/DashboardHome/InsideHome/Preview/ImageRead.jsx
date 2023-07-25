import { useUserContext } from "../../../../../contexts/UserContext";
import style from "./Image.module.css";
import defautPicture from "../../../../../assets/images/Babyplace-2.png";

export default function ImageRead() {
  const { user } = useUserContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const imagePath = `${BACKEND_URL}/uploads/${user.image}`;

  return (
    <div>
      {user.image ? (
        <img src={imagePath} alt="profil" className={style.profil_picture} />
      ) : (
        <img
          src={defautPicture}
          alt="profil"
          className={style.profil_picture}
        />
      )}
    </div>
  );
}
