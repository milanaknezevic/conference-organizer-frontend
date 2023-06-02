import React, { useEffect, useState } from "react";
import {
  fetchKonferecnije,
  fetchTipoviDogadjaja,
} from "../../redux/features/organizatorSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Posjetilac.module.css";
import {
  fetchModeratori,
  fetchLokacije,
} from "../../redux/features/organizatorSlice";
import { setKonferencijeRedux } from "../../redux/features/organizatorSlice";
import OcjenaModal from "../OcjenaModal/OcjenaModal";
import DodajOcjenu from "../OcjenaModal/DodajOcjenu";
const Posjetilac = () => {
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [konferencije, setKonferencije] = useState([]);
  const [showModalZaOcjenu, setShowModalZaOcjenu] = useState(false);
  const [showOcjeniModal, setShowOcjeniModal] = useState(false);
  const [dogadjajZaOcjenu, setDogadjajZaOcjenu] = useState({});
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();

  //const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchKonferecnije(token))
      .then((response) => {
        dispatch(setKonferencijeRedux(response.payload)); // Ažurirajte stanje pomoću akcije setKonferencije
        setKonferencije(response.payload);
      })
      .catch((error) => {});
  }, [dispatch, token, refreshKey]);

  useEffect(() => {
    dispatch(fetchTipoviDogadjaja(token))
      .then((response) => {})
      .catch((error) => {});
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchModeratori(token))
      .then((response) => {
        // dispatch(setModeratori(response.payload)); // Ažurirajte stanje pomoću akcije setModeratori
      })
      .catch((error) => {});
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchLokacije(token))
      .then((response) => {
        // dispatch(setModeratori(response.payload)); // Ažurirajte stanje pomoću akcije setModeratori
      })
      .catch((error) => {});
  }, [dispatch, token]);

  const formatirajDatum = (datum) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = new Date(datum).toLocaleString("en-US", options);
    return formattedDate;
  };

  const handlePrikaziDogadjaje = (konferencija) => {
    if (selectedKonferencija === konferencija) {
      setSelectedKonferencija(null);
    } else {
      setSelectedKonferencija(konferencija);
    }
  };

  const handlePrikaziModalZaOcjenu = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaOcjenu(dogadjaj);
    setShowModalZaOcjenu(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handleOcjeniModal = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaOcjenu(dogadjaj);
    setShowOcjeniModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handleClose = () => {
    setShowModalZaOcjenu(false);
    setShowOcjeniModal(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  let konferencijeList;
  if (konferencije && konferencije.length > 0) {
    konferencijeList = konferencije.map((konferencija) => (
      <div className={classes.organizatorContainer}>
        <li key={konferencija.id} className={classes.organizator}>
          <div className={classes.pom}>
            <div className="underline">
              <span className={classes.poljaColor}>Naziv:</span>{" "}
              <span> {konferencija.naziv}</span>
            </div>
            <div className="underline">
              <span className={classes.poljaColor}>Start Time:</span>{" "}
              <span> {formatirajDatum(konferencija.startTime)}</span>
            </div>
            <div className="underline">
              <span className={classes.poljaColor}>End Time:</span>{" "}
              <span> {formatirajDatum(konferencija.endTime)}</span>
            </div>
            <div className="underline">
              <span className={classes.poljaColor}>Status:</span>{" "}
              <span> {konferencija.status ? "Zavrsena" : "Aktivna"}</span>
            </div>
            {konferencija.url && (
              <div className="underline">
                <span className={classes.poljaColor}>URL:</span>{" "}
                <span> {konferencija.url}</span>
              </div>
            )}
            <div className="underline">
              <span className={classes.poljaColor}>Adresa:</span>{" "}
              <span> {konferencija.lokacija?.adresa}</span>
            </div>
            <div className="underline">
              <span className={classes.poljaColor}>Ocjene:</span>{" "}
              <span
                className={classes.ocjene}
                onClick={() => handlePrikaziModalZaOcjenu(konferencija)}
              >
                Ocjene
              </span>
            </div>
            <div className={classes.divZaButton}>
              <button
                onClick={() => handlePrikaziDogadjaje(konferencija)}
                className={classes.prikaziDogađajeButton}
              >
                {selectedKonferencija === konferencija
                  ? "Sakrij događaje"
                  : "Prikaži događaje"}
              </button>
            </div>
            <div className={classes.ocjeni}>
              {konferencija.status === true && (
                <button onClick={() => handleOcjeniModal(konferencija)}>
                  Ocjeni
                </button>
              )}
            </div>
            {selectedKonferencija === konferencija && (
              <ul>
                {konferencija.dogadjajs.length > 0 ? (
                  konferencija.dogadjajs.map((dogadjaj) => (
                    <li key={dogadjaj.id} className={classes.dogadjaji}>
                      <div>
                        <div className={classes.eventInfo}>
                          <span className={classes.poljaColor}>
                            Naziv događaja:
                          </span>{" "}
                          <span>{dogadjaj.naziv}</span>
                        </div>
                        <div className="underline">
                          <span className={classes.poljaColor}>
                            Start Time:
                          </span>{" "}
                          <span>{formatirajDatum(dogadjaj.startTime)}</span>
                        </div>
                        <div className="underline">
                          <span className={classes.poljaColor}>End Time:</span>{" "}
                          <span>{formatirajDatum(dogadjaj.endTime)}</span>
                        </div>
                        {dogadjaj.url && (
                          <div className="underline">
                            <span className={classes.poljaColor}>URL:</span>{" "}
                            <span>{dogadjaj.url}</span>
                          </div>
                        )}
                        <div className="underline">
                          <span className={classes.poljaColor}>Moderator:</span>{" "}
                          <span>{dogadjaj.korisnik.naziv}</span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className={classes.praznaLista}>Nema dogadjaja!</p>
                )}
              </ul>
            )}
          </div>
          <div className={classes.buttons}></div>
        </li>
      </div>
    ));
  } else {
    konferencijeList = <li>Nema konferencija</li>;
  }

  return (
    <div>
      <h2 className={classes.stilZaH2}>Konferencije</h2>
      <div className={classes.centeredDiv}>
        <ul>{konferencijeList}</ul>
        {showModalZaOcjenu && (
          <OcjenaModal
            onClose={handleClose}
            arg={dogadjajZaOcjenu}
            show={showModalZaOcjenu}
          />
        )}
        {showOcjeniModal && (
          <DodajOcjenu
            onClose={handleClose}
            arg={dogadjajZaOcjenu}
            show={showOcjeniModal}
            korisnik={user}
          />
        )}
      </div>
    </div>
  );
};

export default Posjetilac;
