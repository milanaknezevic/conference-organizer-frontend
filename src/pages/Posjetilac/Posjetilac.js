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
import { PlusCircleFill, Filter, FilterSquare } from "react-bootstrap-icons";
import moment from "moment";
import { dodajPosjetioca } from "../../redux/features/posjetilacSlice";
import Resursi from "../Resursi/Resursi";

const Posjetilac = () => {
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [prijavljeniDogadjaj, setPrijavljeniDogadjaj] = useState(null);
  const [konferencije, setKonferencije] = useState([]);
  const [showModalZaOcjenu, setShowModalZaOcjenu] = useState(false);
  const [showOcjeniModal, setShowOcjeniModal] = useState(false);
  const [dogadjajZaOcjenu, setDogadjajZaOcjenu] = useState({});
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [refreshKey, setRefreshKey] = useState(0);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSucess, setShowSucess] = useState(false);
  const [succesMessage, setSuccesrMessage] = useState("");
  const dispatch = useDispatch();
  const [dogadjajZaResurse, setDogadjajZaResurse] = useState({});
  const [showModalZaResurse, setShowModalZaResurse] = useState(false);

  //const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchKonferecnije(token))
      .then((response) => {
        dispatch(setKonferencijeRedux(response.payload)); // Ažurirajte stanje pomoću akcije setKonferencije
        setKonferencije(response.payload);
        console.log("dohvatio sam, ovo je response", response);
      })
      .catch((error) => {});
    console.log("trebalo bi dohvatiti konferneicje ponovo");
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
  const handlePrikaziModalZaResurse = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaResurse(dogadjaj);
    setShowModalZaResurse(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handlePrikaziDogadjaje = (konferencija) => {
    if (selectedKonferencija === konferencija) {
      setSelectedKonferencija(null);
    } else {
      setSelectedKonferencija(konferencija);
    }
  };
  const handlePrijaviSeNaDogadjaj = (dogadjaj) => {
    const currentTime = new Date(); // Trenutno vrijeme
    const currentTimeFormatted = moment(currentTime).format(
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    );
    console.log(" dogadjaj.endTime,", dogadjaj.endTime);
    console.log(" currentTime,", currentTimeFormatted);
    setPrijavljeniDogadjaj(dogadjaj);
    console.log("dogadjaj", dogadjaj);
    if (currentTimeFormatted < dogadjaj.endTime) {
      setShowError(false);

      const posjetilac = {
        korisnikId: user.user.id,
        dogadjajId: dogadjaj.id,
      };

      console.log("uspjenso si se prijavio na", prijavljeniDogadjaj);
      setShowSucess(true);
      setSuccesrMessage("Prijavljeni ste na dogadjaj!");
      setTimeout(() => {
        setShowSucess(false);
        setSuccesrMessage("");
      }, 1000); // 1 sekunda
      dispatch(dodajPosjetioca({ token: token, posjetilac: posjetilac }))
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {});
    } else {
      console.log("zakasnio si");
      setShowSucess(false);
      setShowError(true);
      setErrorMessage("Vrijeme za prijavu je isteklo!");
      setTimeout(() => {
        setShowError(false);
        setErrorMessage("");
      }, 1000); // 1 sekunda
    }
    //setPrijavljeniDogadjaj(null);
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
    setShowModalZaResurse(false);
    setShowModalZaOcjenu(false);
    setShowOcjeniModal(false);
    setRefreshKey((prevKey) => prevKey + 1);
    console.log("nalazim se u onClose() i refreshKey je", refreshKey);
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
              <span className={classes.poljaColor}>Početak:</span>{" "}
              <span> {formatirajDatum(konferencija.startTime)}</span>
            </div>
            <div className="underline">
              <span className={classes.poljaColor}>Kraj:</span>{" "}
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
            {konferencija.lokacija && (
              <div className="underline">
                <span className={classes.poljaColor}>Adresa:</span>{" "}
                <span> {konferencija.lokacija?.adresa}</span>
              </div>
            )}
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
                      <div className={classes.zaDiv}>
                        <div className={classes.outerDiv}>
                          <div className={classes.eventInfo}>
                            <span className={classes.poljaColor}>
                              Naziv događaja:
                            </span>{" "}
                            <span>{dogadjaj.naziv}</span>
                          </div>
                          <div className={classes.prijavi}>
                            {konferencija.status === true && (
                              <button
                                title=" Prijavi se na događaj"
                                onClick={() =>
                                  handlePrijaviSeNaDogadjaj(dogadjaj)
                                }
                              >
                                <PlusCircleFill className={classes.plus} />
                              </button>
                            )}
                          </div>
                        </div>
                        {prijavljeniDogadjaj?.id === dogadjaj.id &&
                          showSucess && (
                            <div className={classes.poruka}>
                              {succesMessage}
                            </div>
                          )}
                        {prijavljeniDogadjaj?.id === dogadjaj.id &&
                          showError && (
                            <div className={classes.poruka}>{errorMessage}</div>
                          )}

                        <div className="underline">
                          <span className={classes.poljaColor}>Početak:</span>{" "}
                          <span>{formatirajDatum(dogadjaj.startTime)}</span>
                        </div>
                        <div className="underline">
                          <span className={classes.poljaColor}>Kraj:</span>{" "}
                          <span>{formatirajDatum(dogadjaj.endTime)}</span>
                        </div>
                        {dogadjaj.url && (
                          <div className="underline">
                            <span className={classes.poljaColor}>URL:</span>{" "}
                            <span>{dogadjaj.url}</span>
                          </div>
                        )}
                        {dogadjaj.soba && (
                          <div className="underline">
                            <span className={classes.poljaColor}>
                              Prostorija:
                            </span>{" "}
                            <span>{dogadjaj.soba.naziv}</span>
                          </div>
                        )}
                        <div className="underline">
                          <span className={classes.poljaColor}>
                            Tip Dogadjaja:
                          </span>{" "}
                          <span>{dogadjaj.tipDogadjaja.naziv}</span>
                        </div>
                        <div className="underline">
                          <span className={classes.poljaColor}>Moderator:</span>{" "}
                          <span>{dogadjaj.korisnik.naziv}</span>
                        </div>
                        <div className="underline">
                          <span className={classes.poljaColor}>Resursi:</span>{" "}
                          <span
                            className={classes.ocjene}
                            onClick={() =>
                              handlePrikaziModalZaResurse(dogadjaj)
                            }
                          >
                            Resursi
                          </span>
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
      <button>
        <FilterSquare />
      </button>
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
        {showModalZaResurse && (
          <Resursi
            onClose={handleClose}
            dogadjaj={dogadjajZaResurse}
            show={showModalZaResurse}
          />
        )}
      </div>
    </div>
  );
};

export default Posjetilac;
