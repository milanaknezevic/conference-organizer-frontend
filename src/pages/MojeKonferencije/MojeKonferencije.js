import React, { useEffect, useState } from "react";
import { fetchKonferecnijePosjetioca } from "../../redux/features/posjetilacSlice";
import { fetchKonferecnijeModeratora } from "../../redux/features/moderatorSlice";
import classes from "./MojeKonferencije.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setKonferencijePosjetioca } from "../../redux/features/posjetilacSlice";
import { setKonferencijeModeratora } from "../../redux/features/moderatorSlice";
import OcjenaModal from "../OcjenaModal/OcjenaModal";
import DodajOcjenu from "../OcjenaModal/DodajOcjenu";
import Resursi from "../Resursi/Resursi";

const MojeKonferencije = () => {
  const rez = useSelector((state) => state.login);
  const user = rez.user;
  const token = rez.user.token;
  const [konferencije, setKonferencije] = useState([]);
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [refreshKey, setRefreshKey] = useState(0);
  const [showModalZaOcjenu, setShowModalZaOcjenu] = useState(false);
  const [showOcjeniModal, setShowOcjeniModal] = useState(false);
  const [dogadjajZaOcjenu, setDogadjajZaOcjenu] = useState({});
  const [dogadjajZaResurse, setDogadjajZaResurse] = useState({});
  const [showModalZaResurse, setShowModalZaResurse] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    //ne treba sve vec smao na kojim je on posjetilac tj moderator
    console.log("user", user);
    if (user.rola === "POSJETILAC") {
      console.log("user je posjetilac", user.rola);
      console.log("token", token);
      console.log("user id", user.id);
      dispatch(
        fetchKonferecnijePosjetioca({
          token: token,
          idPosjetioca: user.id,
        })
      )
        .then((response) => {
          dispatch(setKonferencijePosjetioca(response.payload)); // Ažurirajte stanje pomoću akcije setKonferencije
          setKonferencije(response.payload);
          console.log("response", response);
        })
        .catch((error) => {});
    } else if (user.rola === "MODERATOR") {
      console.log("user je posjetilac", user.rola);
      console.log("token", token);
      console.log("user id", user.id);
      dispatch(
        fetchKonferecnijeModeratora({
          token: token,
          idModeratora: user.id,
        })
      )
        .then((response) => {
          dispatch(setKonferencijeModeratora(response.payload)); // Ažurirajte stanje pomoću akcije setKonferencije
          setKonferencije(response.payload);
          console.log("response", response);
        })
        .catch((error) => {});
    } else {
      console.log("Error rola nije podrzana");
    }
    console.log("Moje konferencije, ovde bi trebalo da se ponovo dohvae");
  }, [dispatch, token, refreshKey, user]);

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
    console.log(
      "Nalazim se u onClose() i refresh key je ovo su moje konferenicje",
      refreshKey
    );
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
                      <div>
                        <div className={classes.eventInfo}>
                          <span className={classes.poljaColor}>
                            Naziv događaja:
                          </span>{" "}
                          <span>{dogadjaj.naziv}</span>
                        </div>
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
            korisnik={rez}
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

export default MojeKonferencije;
