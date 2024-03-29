import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useUserContext } from "../../../contexts/UserContext";
import defautPicture from "../../../assets/images/Babyplace-2.png";
import instance from "../../../services/APIService";
import userIcon from "../../../assets/icones/user.png";
import style from "./SearchList.module.css";
import DispoPros from "./DispoPros";

export default function SearchList() {
  const { user } = useUserContext();
  const [pros, setPros] = useState(null);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    instance
      .get(`/pro`)
      .then((response) => setPros(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!pros) return null;
  return (
    <div className={style.search_list_page}>
      <div className={style.header}>
        {!user?.id ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={style.button_back}
          >
            <ArrowBackIosNewIcon />
          </button>
        ) : null}
        <div />

        <h2>Liste des crèches disponibles</h2>

        {!user?.id || user?.role === "pro" ? (
          <div className={style.logo_log_in}>
            <img src={userIcon} alt="user" />
            <Link to="/particulier">Connexion</Link>
          </div>
        ) : null}
      </div>

      <div className={style.cards_media}>
        <div className={style.card_media}>
          {pros.map((pro) => (
            <Link key={pro.id} to={`/particulier/recherche/${pro.id}`}>
              <div className={style.animation_div}>
                <Card
                  key={pro.id}
                  sx={{
                    maxWidth: 345,
                    margin: 2,
                    borderRadius: "20px",
                    boxShadow: 3,
                  }}
                >
                  <CardActionArea sx={{ padding: "10px" }}>
                    <div className={style.image}>
                      {pro.image ? (
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${BACKEND_URL}/uploads/${pro.image}`}
                          alt="profil_picture"
                          sx={{
                            position: "relative",
                            zIndex: 10,
                            borderTopRightRadius: "20px",
                            borderTopLeftRadius: "20px",
                          }}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          height="140"
                          image={defautPicture}
                          alt="profil_picture"
                          sx={{
                            position: "relative",
                            zIndex: 10,
                            borderTopRightRadius: "20px",
                            borderTopLeftRadius: "20px",
                          }}
                        />
                      )}
                    </div>

                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h1"
                      sx={{
                        position: "absolute",
                        top: "100px",
                        left: "20px",
                        color: "white",
                        zIndex: 12,
                        backgroundColor: "rgba(0, 0, 0, .3)",
                        borderRadius: "25px",
                        padding: "0.2rem",
                      }}
                    >
                      {pro.name}
                    </Typography>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {/*  Montage composant des disponibilités lié au back */}
                        <DispoPros id={pro.id} />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
