import React, { useEffect, useState, useRef } from "react";
import { fetchKonferecnije } from "../../redux/features/organizatorSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Organizator.module.css";

const Organizator = () => {
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [konferencije, setKonferencije] = useState([]);
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [selectedDogadjaj, setSelectedDogadjaj] = useState(null); // Dodato stanje za praćenje odabranog događaja
  const [nazivKonferencije, setNazivKonferencije] = useState(null);

  const posjetiociSectionRef = useRef(null); // Referenca na donji dio (posjetiociSection)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKonferecnije(token))
      .then((response) => {
        console.log("response", response);
        setKonferencije(response.payload);
      })
      .catch((error) => {
        console.log("error", error);
      });
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
      // Ako je već odabrana ista konferencija, poništavamo odabir
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
      setNazivKonferencije(selectedKonferencija.naziv);
      posjetiociSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  let konferencijeList;
  if (konferencije && konferencije.length > 0) {
    konferencijeList = konferencije.map((konferencija) => (
      <li key={konferencija.id} className={classes.organizator}>
        <div>
          <div className="underline">
            <span className="polja-color">Naziv:</span>{" "}
            <span> {konferencija.naziv}</span>
          </div>
          <div className="underline">
            <span className="polja-color">Start Time:</span>{" "}
            <span> {formatirajDatum(konferencija.startTime)}</span>
          </div>
          <div className="underline">
            <span className="polja-color">End Time:</span>{" "}
            <span> {formatirajDatum(konferencija.endTime)}</span>
          </div>
          <div className="underline">
            <span className="polja-color">Status:</span>{" "}
            <span> {konferencija.status ? "Zavrsena" : "Aktivna"}</span>
          </div>
          {konferencija.url && (
            <div className="underline">
              <span className="polja-color">URL:</span>{" "}
              <span> {konferencija.url}</span>
            </div>
          )}
          <div className="underline">
            <span className="polja-color">Adresa:</span>{" "}
            <span> {konferencija.lokacija.adresa}</span>
          </div>
          {/* Dodatni dio za prikaz događaja */}
          {selectedKonferencija === konferencija && (
            <ul>
              {konferencija.dogadjajs.map((dogadjaj) => (
                <li key={dogadjaj.id} className={classes.dogadjaji}>
                  <div>
                    <div className={classes.eventInfo}>
                      <span className="polja-color">Naziv događaja:</span>{" "}
                      <span>{dogadjaj.naziv}</span>
                    </div>
                    <div className="underline">
                      <span className="polja-color">Start Time:</span>{" "}
                      <span>{formatirajDatum(dogadjaj.startTime)}</span>
                    </div>
                    <div className="underline">
                      <span className="polja-color">End Time:</span>{" "}
                      <span>{formatirajDatum(dogadjaj.endTime)}</span>
                    </div>
                    {dogadjaj.url && (
                      <div className="underline">
                        <span className="polja-color">URL:</span>{" "}
                        <span>{dogadjaj.url}</span>
                      </div>
                    )}
                    <div className="underline">
                      <span className="polja-color">Moderator:</span>{" "}
                      <span>{dogadjaj.korisnik.naziv}</span>
                    </div>
                    <button
                      onClick={() => handlePrikaziPosjetioce(dogadjaj)} // Promijenjen poziv funkcije
                      className={classes.prikaziPosjetioce}
                    >
                      {selectedDogadjaj === dogadjaj
                        ? "Sakrij posjetioce"
                        : "Prikaži posjetioce"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* Kraj dodatnog dijela */}
          <button onClick={() => handlePrikaziDogadjaje(konferencija)}>
            {selectedKonferencija === konferencija
              ? "Sakrij događaje"
              : "Prikaži događaje"}
          </button>{" "}
          {/* Dodato dugme za prikaz događaja */}
        </div>
      </li>
    ));
  } else {
    konferencijeList = <li>Trenutno nema dostupnih konferencija.</li>;
  }

  let posjetiociList;
  if (selectedDogadjaj && selectedDogadjaj.posjetilacs) {
    posjetiociList = (
      <div>
        {selectedDogadjaj.posjetilacs.length > 0 ? (
          <h2 className={classes.stilZaH2}>
            Prikaz posjetilaca za događaj '{selectedDogadjaj.naziv}'
            konferencije '{nazivKonferencije}'
          </h2>
        ) : (
          <p>Nema odabranih posjetilaca.</p>
        )}
        <ul>
          {selectedDogadjaj.posjetilacs.map((posjetilac) => (
            <li key={posjetilac.korisnik.id} className={classes.organizator}>
              <div>
                <div className="underline">
                  <span className="polja-color">Naziv:</span>{" "}
                  <span>{posjetilac.korisnik.naziv}</span>
                </div>
                <div className="underline">
                  <span className="polja-color">Username:</span>{" "}
                  <span>{posjetilac.korisnik.username}</span>
                </div>
                <div className="underline">
                  <span className="polja-color">Email:</span>{" "}
                  <span>{posjetilac.korisnik.email}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    posjetiociList = <li>Nema odabranih posjetilaca.</li>;
  }

  return (
    <div className={classes.organizatorContainer}>
      <section className={classes.topSection}>
        <ul>{konferencijeList}</ul>
      </section>

      <section className={classes.bottomSection}>
        <ul className={`${classes.posjetiociList}`} ref={posjetiociSectionRef}>
          {posjetiociList}
        </ul>{" "}
      </section>
    </div>
  );
};

export default Organizator;
