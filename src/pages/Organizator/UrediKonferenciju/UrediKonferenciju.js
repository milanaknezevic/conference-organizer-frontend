import React, { useState, useEffect } from "react";
import classes from "./UrediKonferenciju.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  azurirajKonferenciju,
  azurirajRezervacije,
} from "../../../redux/features/organizatorSlice";

const UrediKonferenciju = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [nizResursa, setNizResursa] = useState([]);
  const [changed, setChanged] = useState(false);
  const [dogadjajizaBekend, setDogadjajiZaBekend] = useState([]);
  const moderatori = useSelector((state) => state.organizator.moderatori);
  const lokacije = useSelector((state) => state.organizator.lokacije);
  const konferencija = useSelector((state) => state.organizator.izabrana);
  const tipovi_dogadjaja = useSelector(
    (state) => state.organizator.tipoviDogadjaja
  );
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");

  const [showDogadjaje, setShowDogadjaje] = useState(false);
  const [showRezervacije, setShowRezervacije] = useState(false);
  const [startTime, setStartTime] = useState(
    konferencija ? new Date(konferencija.startTime) : new Date()
  );

  const [endTime, setEndTime] = useState(
    konferencija ? new Date(konferencija.endTime) : new Date()
  );

  const [krajKonf, setKrajKonf] = useState(new Date(endTime));
  const [pocetakKonf, setPocetakKonf] = useState(new Date(startTime));
  const [expandedDogadjajId, setExpandedDogadjajId] = useState(null);

  const navigate = useNavigate();

  const [dogadjaji, setDogadjaji] = useState(konferencija?.dogadjajs || []); // Inicijalni niz događaja

  const [dogadjajVremena, setDogadjajVremena] = useState({});
  const [nazivKonferencije, setNazivKonferencije] = useState(
    konferencija.naziv
  );
  const [urlKonferencije, setUrlKonferencije] = useState(konferencija.url);

  useEffect(() => {
    const formatStartTime = () => {
      if (!isNaN(startTime.getTime())) {
        const formattedTime = startTime.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        setFormattedStartTime(formattedTime);
      }
    };
    console.log(formatStartTime);

    const formatEndTime = () => {
      if (!isNaN(endTime.getTime())) {
        const formattedTime = endTime.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        setFormattedEndTime(formattedTime);
      }
    };

    formatStartTime();
    formatEndTime();
  }, [token, changed, startTime, endTime, lokacije, pocetakKonf, krajKonf]);

  useEffect(() => {
    setDogadjajiZaBekend(dogadjaji);
  }, [dogadjaji]);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/organizator");
  };

  const handleStartTimeChange = (date) => {
    setChanged(true);
    setStartTime(date);

    setPocetakKonf(new Date(date));
  };

  const handleEndTimeChange = (date) => {
    setChanged(true);
    setEndTime(date);
    setKrajKonf(new Date(date));
  };

  const handleDogadjajChange = (index, field, value) => {
    setChanged(true);

    const updatedDogadjaji = [...dogadjaji];
    const dogadjaj = updatedDogadjaji[index];

    if (field === "korisnik") {
      const moderatorNaziv = value.target.value;
      const moderatorId = moderatorMap[moderatorNaziv];

      const moderatorObjekat = moderatori.find(
        (moderator) => moderator.id === moderatorId
      );

      if (moderatorObjekat) {
        const updatedDogadjaj = {
          ...dogadjaj,
          korisnik: moderatorObjekat,
        };

        updatedDogadjaji[index] = updatedDogadjaj;
      }
    }
    if (field === "tipDogadjaja") {
      const moderatorNaziv = value.target.value;
      const moderatorId = tipDogadjajaMap[moderatorNaziv];

      const moderatorObjekat = tipovi_dogadjaja.find(
        (moderator) => moderator.id === moderatorId
      );

      if (moderatorObjekat) {
        const updatedDogadjaj = {
          ...dogadjaj,
          tipDogadjaja: {
            id: moderatorObjekat.id,
            naziv: moderatorObjekat.naziv,
          },
        };
        updatedDogadjaji[index] = updatedDogadjaj;
      }
    }
    if (field === "startTime") {
      const updatedValue =
        value instanceof Date ? value : new Date(dogadjaj.startTime); // Koristimo postojeće vrijeme događaja ako nije odabrana nova vrijednost

      const updatedDogadjaj = {
        ...dogadjaj,
        startTime: updatedValue,
      };
      updatedDogadjaji[index] = updatedDogadjaj;
    }
    if (field === "endTime") {
      const updatedValue =
        value instanceof Date ? value : new Date(dogadjaj.endTime); // Koristimo postojeće vrijeme događaja ako nije odabrana nova vrijednost

      const updatedDogadjaj = {
        ...dogadjaj,
        endTime: updatedValue,
      };
      updatedDogadjaji[index] = updatedDogadjaj;
    } else {
      const updatedValue = value instanceof Date ? value : value;

      const updatedDogadjaj = {
        ...dogadjaj,
        [field]: updatedValue,
      };
      updatedDogadjaji[index] = updatedDogadjaj;
    }

    setDogadjajiZaBekend(updatedDogadjaji);
    setDogadjaji(updatedDogadjaji);
  };

  const handleResusrsChange = (dogadjajId, resursId, index, field, value) => {
    setChanged(true);

    const kolicina = value;

    const noviObjekt = {
      kolicina: kolicina,
      dogadjajId: dogadjajId,
      resursId: resursId,
    };

    const existingIndex = nizResursa.findIndex(
      (obj) => obj.resursId === resursId && obj.dogadjajId === dogadjajId
    );

    if (existingIndex !== -1) {
      // Ažuriraj postojeći objekt
      setNizResursa((prevNiz) => {
        const updatedNiz = [...prevNiz];
        updatedNiz[existingIndex].kolicina = kolicina;
        return updatedNiz;
      });
    } else {
      // Dodaj novi objekt u niz
      setNizResursa((prevNiz) => [...prevNiz, noviObjekt]);
    }

    const updatedDogadjaji = [...dogadjaji];
    const dogadjaj = updatedDogadjaji[index];

    const dogadjajPom = dogadjaji.find(
      (dogadjaj) => dogadjaj.id === dogadjajId
    );

    const updatedRezervacijas = dogadjajPom.rezervacijas.map((rezervacija) => {
      if (rezervacija.resurs.id === resursId) {
        return {
          ...rezervacija,
          kolicina: value,
        };
      }
      return rezervacija;
    });

    const updatedDogadjaj = {
      ...dogadjaj,
      rezervacijas: updatedRezervacijas,
    };

    updatedDogadjaji[index] = updatedDogadjaj;
    setDogadjajiZaBekend(updatedDogadjaji);
    setDogadjaji(updatedDogadjaji);
  };
  const totalLengthCache = new Map();

  // Funkcija za izračunavanje totalLength za svaku rezervaciju
  const calculateTotalLength = (rezervacija, rezervacijaId) => {
    if (totalLengthCache.has(rezervacijaId)) {
      return totalLengthCache.get(rezervacijaId);
    }

    const totalLength = rezervacija.kolicina + rezervacija.resurs.kolicina;
    totalLengthCache.set(rezervacijaId, totalLength);
    return totalLength;
  };
  const handleSave = (e) => {
    e.preventDefault();
    setPocetakKonf(new Date(startTime));
    setKrajKonf(new Date(endTime));
    if (!changed) {
      setDogadjajiZaBekend(dogadjaji); // Postavite dogadjajiZaBekend na vrijednost dogadjaji
    }

    const konferencijaRequest = {
      startTime: pocetakKonf,
      endTime: krajKonf,
      naziv: nazivKonferencije,
      url: urlKonferencije,
      dogadjaji: dogadjajizaBekend.map((dogadjaj) => ({
        startTime: new Date(dogadjaj.startTime),
        endTime: new Date(dogadjaj.endTime),
        naziv: dogadjaj.naziv,
        url: dogadjaj.url,
        rezervacijas: dogadjaj.rezervacijas,
        tipDogadjaja: dogadjaj.tipDogadjaja.id,
        lokacijaId: dogadjaj.lokacija.id,
        moderator_Id: dogadjaj.korisnik.id,
      })),
    };

    //sad salji update bekendu
    const idKonferencije = konferencija.id;
    dispatch(
      azurirajKonferenciju({ token, idKonferencije, konferencijaRequest })
    )
      .then((response) => {})
      .catch((error) => {});

    dispatch(azurirajRezervacije({ token, nizResursa }))
      .then((response) => {})
      .catch((error) => {});
  };

  const moderatorMap = {};
  moderatori.forEach((moderator) => {
    moderatorMap[moderator.naziv] = moderator.id;
  });
  const handleNazivChange = (e) => {
    setChanged(true);
    setNazivKonferencije(e.target.value);
  };
  const handleUrlKonfChange = (e) => {
    setChanged(true);
    setUrlKonferencije(e.target.value);
  };
  const tipDogadjajaMap = {};
  tipovi_dogadjaja.forEach((tip) => {
    tipDogadjajaMap[tip.naziv] = tip.id;
  });

  const lokacijaMap = {};
  lokacije.forEach((lokacija) => {
    lokacijaMap[lokacija.adresa] = lokacija.id;
  });

  return (
    <div className={classes.App}>
      <div className={classes.authFormContainer}>
        <form className={classes.editForm} onSubmit={handleSave}>
          <label htmlFor="naziv">Naziv:</label>
          <input
            className={classes.input}
            value={nazivKonferencije}
            type="text"
            placeholder="Korisničko ime"
            id="naziv"
            onChange={handleNazivChange}
          />
          <label htmlFor="startTime">Početak:</label>

          <DatePicker
            onChange={handleStartTimeChange}
            className={classes.input}
            selected={dogadjajVremena[startTime] || new Date(startTime)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy HH:mm"
            id={`startTime`}
          />

          <label htmlFor="endTime">Kraj:</label>
          <DatePicker
            onChange={handleEndTimeChange}
            className={classes.input}
            selected={dogadjajVremena[endTime] || new Date(endTime)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy HH:mm"
            id={`endTime`}
          />
          {konferencija.url && (
            <>
              <label htmlFor="url">Url:</label>
              <input
                className={classes.input}
                value={urlKonferencije}
                type="text"
                id="url"
                onChange={handleUrlKonfChange}
              />
            </>
          )}

          <div className={classes.dogadjajiHeader}>
            <span>Dogadjaji</span>
            <button
              className={classes.plusButton}
              onClick={(e) => {
                e.preventDefault();
                setShowDogadjaje(!showDogadjaje);
              }}
            >
              {showDogadjaje ? "-" : "+"}
            </button>
          </div>

          {showDogadjaje && (
            <ul className={classes.ul}>
              {dogadjaji.length > 0 &&
                dogadjaji.map((dogadjaj, index) => (
                  <li key={index} className={classes.korisnikItem}>
                    <div className={classes.dogadjajHeader}>
                      <span>Dogadjaj: {dogadjaj.naziv}</span>
                      <button
                        className={classes.plusButton}
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedDogadjajId(
                            expandedDogadjajId === dogadjaj.id
                              ? null
                              : dogadjaj.id
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                    {expandedDogadjajId === dogadjaj.id && (
                      <div className={classes.editForm}>
                        <label htmlFor={`naziv-${dogadjaj.id}`}>Naziv:</label>
                        <input
                          className={classes.input}
                          value={dogadjaj.naziv}
                          type="text"
                          readOnly={false}
                          id={`naziv-${dogadjaj.id}`}
                          onChange={(e) => {
                            handleDogadjajChange(
                              index,
                              "naziv",
                              e.target.value
                            );
                          }}
                        />
                        <label htmlFor={`startTime-${dogadjaj.id}`}>
                          Početak:
                        </label>
                        <DatePicker
                          className={classes.input}
                          selected={
                            dogadjajVremena[dogadjaj.id] ||
                            new Date(dogadjaj.startTime)
                          }
                          onChange={(e) => {
                            handleDogadjajChange(index, "startTime", e);
                          }}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="MM/dd/yyyy HH:mm"
                          id={`startTime-${dogadjaj.id}`}
                        />
                        <label htmlFor={`endTime-${dogadjaj.id}`}>Kraj:</label>
                        <DatePicker
                          className={classes.input}
                          selected={
                            dogadjajVremena[dogadjaj.id] ||
                            new Date(dogadjaj.endTime)
                          }
                          onChange={(e) => {
                            handleDogadjajChange(index, "endTime", e);
                          }}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="MM/dd/yyyy HH:mm"
                          id={`endTime-${dogadjaj.id}`}
                        />
                        {dogadjaj.url && (
                          <>
                            <label htmlFor={`url-${dogadjaj.id}`}>Url:</label>
                            <input
                              className={classes.input}
                              value={dogadjaj.url}
                              type="text"
                              id={`url-${dogadjaj.id}`}
                              onChange={(e) => {
                                handleDogadjajChange(
                                  index,
                                  "url",
                                  e.target.value
                                );
                              }}
                            />
                          </>
                        )}
                        <label htmlFor={`moderator-${dogadjaj.korisnik.id}`}>
                          Moderator:
                        </label>
                        <select
                          className={classes.selekt}
                          onChange={(e) => {
                            handleDogadjajChange(index, "korisnik", e);
                          }}
                        >
                          {moderatori.map((moderator) => (
                            <option key={moderator.id} value={moderator.naziv}>
                              {moderator.naziv}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor={`tipDogadjaja-${dogadjaj.tipDogadjaja.id}`}
                        >
                          Tip Dogadjaja:
                        </label>
                        <select
                          className={classes.selekt}
                          onChange={(e) => {
                            handleDogadjajChange(index, "tipDogadjaja", e);
                          }}
                        >
                          {tipovi_dogadjaja.map((tip) => (
                            <option key={tip.id} value={tip.naziv}>
                              {tip.naziv}
                            </option>
                          ))}
                        </select>
                        <div className={classes.dogadjajiHeader}>
                          <span>Rezervacije:</span>
                          <button
                            className={classes.plusButton}
                            onClick={(e) => {
                              e.preventDefault();
                              setShowRezervacije(!showRezervacije);
                            }}
                          >
                            {showRezervacije ? "-" : "+"}
                          </button>
                        </div>
                        {showRezervacije && (
                          <>
                            {dogadjaj.rezervacijas.length > 0 ? (
                              <ul className={classes.ul}>
                                {dogadjaj.rezervacijas.map((rezervacija) => (
                                  <li
                                    key={rezervacija.id}
                                    className={classes.korisnikItem}
                                  >
                                    <label>{rezervacija.resurs.naziv}</label>

                                    <select
                                      className={classes.selekt}
                                      value={rezervacija.kolicina}
                                      onChange={(e) => {
                                        handleResusrsChange(
                                          dogadjaj.id,
                                          rezervacija.resurs.id,
                                          index,
                                          "rezervacijas",
                                          e.target.value
                                        );
                                      }}
                                      key={rezervacija.id}
                                    >
                                      {Array.from(
                                        {
                                          length: calculateTotalLength(
                                            rezervacija,
                                            index
                                          ),
                                        },
                                        (_, index) => (
                                          <option
                                            key={index}
                                            value={index + 1}
                                            defaultValue={
                                              index + 1 === rezervacija.kolicina
                                                ? true
                                                : undefined
                                            }
                                          >
                                            {index + 1}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p style={{ color: "red" }}>Nema rezervacija!</p>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}

          <div className={classes.btnDiv}>
            <button
              className={`${classes.btn} ${changed ? "" : classes.disabled}`}
              type="submit"
              disabled={!changed}
            >
              Sačuvaj
            </button>
            <button className={classes.btn} onClick={handleCancel}>
              Odustani
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UrediKonferenciju;
