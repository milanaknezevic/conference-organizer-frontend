import React, { useEffect, useState, useRef } from "react";
import {
  fetchKonferecnije,
  fetchTipoviDogadjaja,
} from "../../redux/features/organizatorSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Organizator.module.css";
import Obrisi from "../Obrisi/Obrisi";
import { izabranaKonferencija } from "../../redux/features/organizatorSlice";
import {
  fetchModeratori,
  fetchLokacije,
} from "../../redux/features/organizatorSlice";
import { setKonferencijeRedux } from "../../redux/features/organizatorSlice";
import AddConference from "./AddConference/AddConference";
import UrediKonferenciju from "./UrediKonferenciju/UrediKonferenciju";
import Posjetioci from "../Posjetioci/Posjetioci";
import { Pencil, Trash } from "react-bootstrap-icons";
import Resursi from "../Resursi/Resursi";
import OcjenaModal from "../OcjenaModal/OcjenaModal";

const Organizator = () => {
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [konferencije, setKonferencije] = useState([]);
  const [konferencijaZaBrisanje, setKonferencijaZaBrisanje] = useState({});
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [selectedDogadjaj, setSelectedDogadjaj] = useState(null); // Dodato stanje za praćenje odabranog događaja
  const [showModal, setShowModal] = useState(false); // Dodato stanje za prikazivanje modalnog prozora
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPosjetiociModal, setShowPosjetiociModal] = useState(false);
  const [dogadjajZaPosjetioce, setDogadjajZaPosjetioce] = useState({});
  const posjetiociSectionRef = useRef(null); // Referenca na donji dio (posjetiociSection)
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();
  const [dogadjajZaResurse, setDogadjajZaResurse] = useState({});
  const [showModalZaResurse, setShowModalZaResurse] = useState(false);
  const [showModalZaOcjenu, setShowModalZaOcjenu] = useState(false);
  const [dogadjajZaOcjenu, setDogadjajZaOcjenu] = useState({});

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
  const handlePrikaziModalZaResurse = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaResurse(dogadjaj);
    setShowModalZaResurse(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handleClose = () => {
    setShowModalZaOcjenu(false);
    setKonferencijaZaBrisanje([]);
    setShowModalZaResurse(false);
    setShowModal(false);
    setshowAddModal(false);
    setShowEditModal(false);
    setShowPosjetiociModal(false);
  };
  const handleAddConference = () => {
    setshowAddModal(true);
  };
  const handleUredi = (konferencija) => {
    dispatch(izabranaKonferencija(konferencija));
    setShowEditModal(true);
    //navigate("/urediKonferenciju");
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

  const handleObrisi = (konferencija) => {
    setKonferencijaZaBrisanje(konferencija);
    setShowModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handlePrikaziPosjetioceModal = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaPosjetioce(dogadjaj);
    setShowPosjetiociModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };

  const handlePrikaziDogadjaje = (konferencija) => {
    console.log("konferencija", konferencija);
    if (selectedKonferencija === konferencija) {
      setSelectedKonferencija(null);
    } else {
      setSelectedKonferencija(konferencija);
    }
  };
  const handlePrikaziPosjetioce = (dogadjaj) => {
    setShowPosjetiociModal(true);
    console.log("Posjetioce prikazi", showPosjetiociModal);
    /* if (selectedDogadjaj === dogadjaj) {
      setSelectedDogadjaj(null);
    } else {
      setSelectedDogadjaj(dogadjaj);
      /* if (posjetiociSectionRef.current) {
        // Provera da li je referenca definisana
        posjetiociSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }*/
    //}
  };
  const handlePrikaziModalZaOcjenu = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaOcjenu(dogadjaj);
    setShowModalZaOcjenu(true); // Postavite showModal na true kada se pritisne dugme za brisanje
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
                        <button
                          onClick={() => handlePrikaziPosjetioceModal(dogadjaj)}
                          className={classes.prikaziDogađajeButton}
                        >
                          {selectedDogadjaj === dogadjaj
                            ? "Sakrij posjetioce"
                            : "Prikaži posjetioce"}
                        </button>
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
              <Pencil /> Uredi
            </button>
            <button
              className={classes.deleteButton}
              onClick={() => handleObrisi(konferencija)}
            >
              <Trash /> Obrisi
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
      <div className={classes.centeredDiv}>
        <ul>{konferencijeList}</ul>
        {showModal && (
          <Obrisi
            onClose={handleClose}
            konferencija={konferencijaZaBrisanje}
            idKonferencije={konferencijaZaBrisanje.id}
            token={token}
            onSave={handleSaveObrisi}
          />
        )}
        {showAddModal && (
          <AddConference onClose={handleClose} onSave={handleSaveObrisi} />
        )}
        {showEditModal && (
          <UrediKonferenciju onClose={handleClose} onSave={handleSaveObrisi} />
        )}
        {showPosjetiociModal && (
          <Posjetioci
            onClose={handleClose}
            dogadjaj={dogadjajZaPosjetioce}
            show={showPosjetiociModal}
          />
        )}
        {showModalZaResurse && (
          <Resursi
            onClose={handleClose}
            dogadjaj={dogadjajZaResurse}
            show={showModalZaResurse}
          />
        )}
        {showModalZaOcjenu && (
          <OcjenaModal
            onClose={handleClose}
            arg={dogadjajZaOcjenu}
            show={showModalZaOcjenu}
          />
        )}
      </div>

      <div>
        <button
          className={classes.roundButton}
          title="Kreiraj novu konferenciju"
          onClick={handleAddConference}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Organizator;
