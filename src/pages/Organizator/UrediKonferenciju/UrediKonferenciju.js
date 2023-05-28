import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./UrediKonferenciju.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const UrediKonferenciju = () => {
  const moderatori = useSelector((state) => state.organizator.moderatori);
  const lokacije = useSelector((state) => state.organizator.lokacije);
  const konferencija = useSelector((state) => state.organizator.izabrana);
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");
  const [selectedModerator, setSelectedModerator] = useState("");
  const [selectedLokacija, setSelectedLokacija] = useState("");

  const [startTime, setStartTime] = useState(
    konferencija ? new Date(konferencija.startTime) : new Date()
  );
  const [endTime, setEndTime] = useState(
    konferencija ? new Date(konferencija.endTime) : new Date()
  );
  const [expandedDogadjajId, setExpandedDogadjajId] = useState(null);

  const navigate = useNavigate();

  const dogadjaji = konferencija?.dogadjajs || [];
  const [dogadjajVremena, setDogadjajVremena] = useState({});

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

      console.log("lokacije", lokacije);
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
  }, [startTime, endTime, lokacije]);

  const handleDogadjajTimeChange = (eventId, date, e) => {
    e.preventDefault();
    setDogadjajVremena((prevState) => ({
      ...prevState,
      [eventId]: date,
    }));
  };

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
    setStartTime(date);
  };

  const handleEndTimeChange = (date) => {
    setEndTime(date);
  };

  const handleModeratorChange = (e, dogadjajId) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    const selectedModeratorId = moderatorMap[selectedValue];
    setSelectedModerator((prevState) => ({
      ...prevState,
      [dogadjajId]: selectedModeratorId,
    }));

    console.log("novi moder", selectedModeratorId);
  };

  const handleLokacijaChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    const selectedLokacijaId = lokacijaMap[selectedValue];
    setSelectedLokacija((prevState) => ({
      ...prevState,
    }));

    console.log("nova lokacija", selectedLokacijaId);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Ovdje možete koristiti selectedModerators i dogadjajVremena za spremanje promjena
  };
  const moderatorMap = {};
  moderatori.forEach((moderator) => {
    moderatorMap[moderator.naziv] = moderator.id;
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
            value={konferencija.naziv}
            type="text"
            placeholder="Korisničko ime"
            id="naziv"
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
                value={konferencija.url}
                type="text"
                id="url"
              />
            </>
          )}
          <label htmlFor="lokacija">Lokacija:</label>

          <select
            className={classes.selekt}
            onChange={(event) => handleLokacijaChange(event)}
          >
            {lokacije.map((lokacija) => (
              <option key={lokacija.id} value={lokacija.adresa}>
                {lokacija.adresa}
              </option>
            ))}
          </select>

          <ul className={classes.ul}>
            {dogadjaji.length > 0 &&
              dogadjaji.map((dogadjaj) => (
                <li key={dogadjaj.id} className={classes.korisnikItem}>
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
                        id={`naziv-${dogadjaj.id}`}
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
                        onChange={(date) =>
                          handleDogadjajTimeChange(dogadjaj.id, date)
                        }
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
                        onChange={(date) =>
                          handleDogadjajTimeChange(dogadjaj.id, date)
                        }
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
                          />
                        </>
                      )}

                      <label htmlFor={`moderator-${dogadjaj.korisnik.id}`}>
                        Moderator:
                      </label>

                      <select
                        className={classes.selekt}
                        onChange={(event) =>
                          handleModeratorChange(event, dogadjaj.id)
                        }
                      >
                        {moderatori.map((moderator) => (
                          <option key={moderator.id} value={moderator.naziv}>
                            {moderator.naziv}
                          </option>
                        ))}
                      </select>

                      {/* Dodajte ostale inpute za ostale informacije o događaju */}
                    </div>
                  )}
                </li>
              ))}
          </ul>
          <div className={classes.btnDiv}>
            <button className={classes.btn} type="submit">
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
