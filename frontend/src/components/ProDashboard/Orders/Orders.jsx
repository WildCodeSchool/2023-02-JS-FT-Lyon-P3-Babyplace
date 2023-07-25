import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./Orders.module.css";
import OrderCard from "./OrderCard";
import instance from "../../../services/APIService";

export default function Orders() {
  const [selectedValue, setSelectedValue] = useState(4);
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const limitPerPage = 10;
  const defaultPage = 1;
  const [maxPage, setMaxPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page"), 10) || defaultPage
  );
  const status = selectedValue;
  const reservationsContainerRef = useRef(null);

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
    setCurrentPage(1);
  };

  // la fonction suivante sert à sélectionner le statut des réservation que l'on veut afficher
  const filterOrder = (res) => {
    if (parseInt(selectedValue, 10) === 4) {
      return 4;
    }
    if (parseInt(res.status, 10) === 0) {
      return 0;
    }
    if (parseInt(res.status, 10) === 1) {
      return 1;
    }
    if (parseInt(res.status, 10) === 2) {
      return 2;
    }
    if (parseInt(res.status, 10) === 3) {
      return 3;
    }
    return null;
  };

  // on map sur une variable qui contient nos réservations toujours filtré
  const filteredOrders = reservations.filter(
    (reservation) => filterOrder(reservation) === parseInt(selectedValue, 10)
  );

  // Dans ce useEffect, on récupère nos données et le nombre total de réservations depuis le back
  // on peut ensuite calculer le nombre de pages à afficher
  // on utilise la fonction srollToTop dans un useRef car on veut remonter une div et non la window.
  useEffect(() => {
    setSearchParams((params) => {
      searchParams.set("page", currentPage);
      if (currentPage === 1) {
        return undefined;
      }
      return params;
    });
    const scrollToTop = () => {
      if (reservationsContainerRef.current) {
        reservationsContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };
    instance
      .get(`/dashboard/reservations?page=${currentPage}&status=${status}`)
      .then((res) => {
        setReservations(res.data.datas);
        setNumberOfResults(res.data.total);
        setMaxPage(Math.ceil(res.data.total / limitPerPage));
        scrollToTop();
      })
      .catch((err) => console.error(err));
  }, [currentPage, selectedValue, refreshData]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className={styles.orders_box}>
      <div className={styles.orders_header}>
        <div>
          <h3>Toutes les réservations</h3>
          <p>{numberOfResults} Résultats</p>
        </div>
        <div className={styles.filter_btn_box}>
          <Button
            value="4"
            variant="contained"
            color="secondary"
            onClick={handleSelect}
            sx={{ marginRight: 1, marginLeft: 1 }}
          >
            Toutes
          </Button>
          <Button
            value="0"
            variant="outlined"
            color="secondary"
            onClick={handleSelect}
            sx={{ mx: 1 }}
          >
            En attente
          </Button>
          <Button
            value="1"
            variant="outlined"
            onClick={handleSelect}
            color="success"
            sx={{ mx: 1 }}
          >
            Acceptées
          </Button>
          <Button
            value="2"
            variant="outlined"
            onClick={handleSelect}
            color="error"
            sx={{ mx: 1 }}
          >
            Refusées
          </Button>
          <Button
            value="3"
            variant="outlined"
            onClick={handleSelect}
            color="warning"
            sx={{ mx: 1 }}
          >
            Annulées
          </Button>
        </div>
      </div>
      {!reservations || reservations.length === 0 ? (
        <div className={styles.nodata}>
          <p>
            Vous n'avez aucune réservation en cours sur les prochains jours.
          </p>
        </div>
      ) : null}
      <div className={styles.orders_container} ref={reservationsContainerRef}>
        {filteredOrders.map((reservation) => (
          <OrderCard
            key={reservation.id}
            reservation={reservation}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
          />
        ))}
        {numberOfResults !== 0 && (
          <div className={styles.pagination_btn_container}>
            <Button
              variant="contained"
              sx={{
                mx: 3,
                backgroundColor: "rgb(165,165,255)",
                "&:hover": {
                  backgroundColor: "rgb(126,114,242)",
                },
              }}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            {currentPage} / {maxPage}
            <Button
              variant="contained"
              sx={{
                mx: 3,
                backgroundColor: "rgb(165,165,255)",
                "&:hover": {
                  backgroundColor: "rgb(126,114,242)",
                },
              }}
              onClick={handleNext}
              disabled={currentPage === maxPage}
            >
              Suivant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
