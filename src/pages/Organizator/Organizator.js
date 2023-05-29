import React, { useEffect, useState, useRef } from "react";
import {
  fetchKonferecnije,
  fetchTipoviDogadjaja,
} from "../../redux/features/organizatorSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Organizator.module.css";
import Obrisi from "../Obrisi/Obrisi";
import { useNavigate } from "react-router-dom";
import { izabranaKonferencija } from "../../redux/features/organizatorSlice";
import {
  fetchModeratori,
  fetchLokacije,
} from "../../redux/features/organizatorSlice";
import {
  setKonferencijeRedux,
  setModeratori,
} from "../../redux/features/organizatorSlice";
const Organizator = () => {
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [konferencije, setKonferencije] = useState([]);
  const [konferencijaZaBrisanje, setKonferencijaZaBrisanje] = useState({});
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [selectedDogadjaj, setSelectedDogadjaj] = useState(null); // Dodato stanje za praćenje odabranog događaja
  const [showModal, setShowModal] = useState(false); // Dodato stanje za prikazivanje modalnog prozora
  const posjetiociSectionRef = useRef(null); // Referenca na donji dio (posjetiociSection)
  const [refreshKey, setRefreshKey] = useState(0);
  const konf = useSelector((state) => state.organizator);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleClose = () => {
    setKonferencijaZaBrisanje([]);
    setShowModal(false);
  };
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
  const handleUredi = (konferencija) => {
    dispatch(izabranaKonferencija(konferencija));

    navigate("/urediKonferenciju");
  };

  const handleObrisi = (konferencija) => {
    setKonferencijaZaBrisanje(konferencija);
    setShowModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };

  const handlePrikaziDogadjaje = (konferencija) => {
    if (selectedKonferencija === konferencija) {
      setSelectedKonferencija(null);
    } else {
      setSelectedKonferencija(konferencija);
    }
  };
  const handlePrikaziPosjetioce = (dogadjaj) => {
    if (selectedDogadjaj === dogadjaj) {
      setSelectedDogadjaj(null);
    } else {
      setSelectedDogadjaj(dogadjaj);
      if (posjetiociSectionRef.current) {
        // Provera da li je referenca definisana
        posjetiociSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
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
              <span> {konferencija.lokacija.adresa}</span>
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
                        <button
                          onClick={() => handlePrikaziPosjetioce(dogadjaj)}
                          className={classes.prikaziDogađajeButton}
                        >
                          {selectedDogadjaj === dogadjaj
                            ? "Sakrij posjetioce"
                            : "Prikaži posjetioce"}
                        </button>
                        {selectedDogadjaj === dogadjaj && (
                          <ul>
                            {dogadjaj.posjetilacs.length > 0 ? (
                              dogadjaj.posjetilacs.map((posjetilac) => (
                                <li
                                  key={posjetilac.korisnik.id}
                                  className={classes.posjetioci}
                                >
                                  <div className={classes.posjetilacInfo}>
                                    <div className="underline">
                                      <span className={classes.poljaColor}>
                                        Naziv:
                                      </span>{" "}
                                      <span>{posjetilac.korisnik.naziv}</span>
                                    </div>
                                    <div className="underline">
                                      <span className={classes.poljaColor}>
                                        Email:
                                      </span>{" "}
                                      <span>{posjetilac.korisnik.email}</span>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <p className={classes.praznaLista}>
                                Nema posjetilaca!
                              </p>
                            )}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className={classes.praznaLista}>Nema dogadjaja!</p>
                )}
              </ul>
            )}
          </div>
          <div className={classes.buttons}>
            <button
              className={classes.editButton}
              onClick={() => handleUredi(konferencija)}
            >
              Uredi
            </button>
            <button
              className={classes.deleteButton}
              onClick={() => handleObrisi(konferencija)}
            >
              Obrisi
            </button>
          </div>
        </li>
      </div>
    ));
  } else {
    konferencijeList = <li>Nema konferencija</li>;
  }
  const handleSaveObrisi = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <div>
      <h2 className={classes.stilZaH2}>Konferencije</h2>
      <ul>{konferencijeList}</ul>
      {showModal && (
        <Obrisi
          onClose={handleClose}
          konferencija={konferencijaZaBrisanje}
          idKonferencije={konferencijaZaBrisanje.id}
          token={token}
          onSave={handleSaveObrisi}
        />
      )}{" "}
      {/* Prikazuje modal ako je showModal true */}
      <div ref={posjetiociSectionRef} />{" "}
      {/* Prazan div koji će biti target za scrollIntoView */}
    </div>
  );
};

export default Organizator;
