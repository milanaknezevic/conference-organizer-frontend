import React, { useState, useEffect } from "react";
import classes from "./UrediKonferenciju.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { azurirajKonferenciju } from "../../../redux/features/organizatorSlice";

const UrediKonferenciju = () => {
  const dispatch = useDispatch();
  const setRezervacijeZaBekend = [];
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [changed, setChanged] = useState(false);
  const [dogadjajizaBekend, setDogadjajiZaBekend] = useState([]);
  const [selectedKolicina, setSelectedKolicina] = useState(0);
  const moderatori = useSelector((state) => state.organizator.moderatori);
  const lokacije = useSelector((state) => state.organizator.lokacije);
  const konferencija = useSelector((state) => state.organizator.izabrana);
  const tipovi_dogadjaja = useSelector(
    (state) => state.organizator.tipoviDogadjaja
  );
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");
  const [selectedModerator, setSelectedModerator] = useState("");
  const [selectedLokacija, setSelectedLokacija] = useState("");
  const [selectedTipDogadjaja, setSelectedTipDOgadjaja] = useState("");
  const [showDogadjaje, setShowDogadjaje] = useState(false);
  const [showRezervacije, setShowRezervacije] = useState(false);
  const [startTime, setStartTime] = useState(
    konferencija ? new Date(konferencija.startTime) : new Date()
  );

  const [endTime, setEndTime] = useState(
    konferencija ? new Date(konferencija.endTime) : new Date()
  );

  const [krajKonf, setKrajKonf] = useState(new Date(endTime.toISOString()));
  const [pocetakKonf, setPocetakKonf] = useState(
    new Date(startTime).toISOString()
  );
  const [expandedDogadjajId, setExpandedDogadjajId] = useState(null);

  const navigate = useNavigate();

  //const dogadjaji = konferencija?.dogadjajs || [];

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

  const formatirajVrijeme = (datum, dogadjajId) => {
    const dogadjajVrijeme = dogadjajVremena[dogadjajId];
    if (dogadjajVrijeme && !isNaN(dogadjajVrijeme.getTime())) {
      return dogadjajVrijeme.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (!isNaN(datum.getTime())) {
      return datum.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    return "";
  };

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

    console.log("CIAOOOO");
    console.log("index", index);
    console.log("field", field);
    console.log("value", value);
    const updatedDogadjaji = [...dogadjaji];
    const dogadjaj = updatedDogadjaji[index];

    if (field === "korisnik") {
      const moderatorNaziv = value.target.value;
      const moderatorId = moderatorMap[moderatorNaziv];
      console.log("ime", moderatorNaziv);
      console.log("id", moderatorId);

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
    if (field === "rezervacijas") {
      console.log("REZERVACIJE");
    } else if (field === "tipDogadjaja") {
      const tipDOgadjajaNaziv = value.target.value;
      const tipDOgadjajaId = tipDogadjajaMap[tipDOgadjajaNaziv];
      console.log("ime", tipDOgadjajaNaziv);
      console.log("id", tipDOgadjajaId);

      const tipObjekat = tipovi_dogadjaja.find(
        (tip) => tip.id === tipDOgadjajaId
      );
      if (tipObjekat) {
        const updatedDogadjaj = {
          ...dogadjaj,
          tipDogadjaja: tipObjekat,
        };
        updatedDogadjaji[index] = updatedDogadjaj;
      }
    }

    if (field === "startTime") {
      const updatedValue =
        value instanceof Date ? value : new Date(dogadjaj.startTime); // Koristimo postojeće vrijeme događaja ako nije odabrana nova vrijednost
      console.log("value", value);
      console.log("updatedValue", updatedValue);
      console.log("updatedValue.toISOString()", updatedValue.toISOString());
      const updatedDogadjaj = {
        ...dogadjaj,
        startTime: updatedValue.toISOString(),
      };
      updatedDogadjaji[index] = updatedDogadjaj;
    } else if (field === "endTime") {
      const updatedValue =
        value instanceof Date ? value : new Date(dogadjaj.endTime); // Koristimo postojeće vrijeme događaja ako nije odabrana nova vrijednost
      updatedValue.setUTCFullYear(updatedValue.getUTCFullYear());
      updatedValue.setUTCMonth(updatedValue.getUTCMonth());
      updatedValue.setUTCDate(updatedValue.getUTCDate());
      updatedValue.setUTCHours(updatedValue.getUTCHours());
      updatedValue.setUTCMinutes(updatedValue.getUTCMinutes());
      const updatedDogadjaj = {
        ...dogadjaj,
        endTime: updatedValue.toISOString(),
      };
      updatedDogadjaji[index] = updatedDogadjaj;
    } else {
      const updatedValue = value instanceof Date ? value.toISOString() : value;

      const updatedDogadjaj = {
        ...dogadjaj,
        [field]: updatedValue,
      };
      updatedDogadjaji[index] = updatedDogadjaj;
    }

    setDogadjajiZaBekend(updatedDogadjaji);
    setDogadjaji(updatedDogadjaji);
    console.log("updatedDogadjaji", updatedDogadjaji);
  };

  const handleResusrsChange = (dogadjajId, resursId, index, field, value) => {
    console.log("dogadjajId", dogadjajId);
    console.log("rez id", resursId);
    console.log("value", value);
    /*const niz=[];
var noviObjekt = { id: id, kolicina: kolicina, ida: ida };
niz.push(noviObjekt);*/

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
    console.log("updatedDogadjaji", updatedDogadjaji);

    // event.preventDefault();
    // const selectedValue = event.target.value;
    // setSelectedKolicina(selectedValue);
    /*console.log("novi dog id", dogadjajId);
    console.log("novi resurs id", resursId);
    console.log("novi kolicina", selectedValue);*/
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
        startTime: new Date(dogadjaj.startTime).toISOString(),
        endTime: new Date(dogadjaj.endTime).toISOString(),
        naziv: dogadjaj.naziv,
        url: dogadjaj.url,
        rezervacijas: dogadjaj.rezervacijas,
        tipDogadjaja: dogadjaj.tipDogadjaja.id,
        lokacijaId: dogadjaj.lokacija.id,
        moderator_Id: dogadjaj.korisnik.id,
      })),
    };
    console.log("request", konferencijaRequest);

    //sad salji update bekendu
    const idKonferencije = konferencija.id;
    dispatch(
      azurirajKonferenciju({ token, idKonferencije, konferencijaRequest })
    )
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
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy HH:mm"
            id="startTime"
            value={formatirajVrijeme(startTime)}
          />
          <label htmlFor="endTime">Kraj:</label>
          <DatePicker
            onChange={handleEndTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy HH:mm"
            id="endTime"
            value={formatirajVrijeme(endTime)}
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
                                          length:
                                            rezervacija.kolicina +
                                            rezervacija.resurs.kolicina,
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
