import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./UrediKonferenciju.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const UrediKonferenciju = () => {
  const konferencija = useSelector((state) => state.organizator.izabrana);
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");
  const [startTime, setStartTime] = useState(new Date(konferencija.startTime));
  const [endTime, setEndTime] = useState(new Date(konferencija.endTime));
  const [showDogadjaji, setShowDogadjaji] = useState(false); // Stanje za prikazivanje/skrivanje liste događaja
  const navigate = useNavigate();

  const dogadjaji = konferencija.dogadjajs; // Lista događaja

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
  }, [startTime, endTime, formattedEndTime, formattedStartTime]);

  const handleCancel = () => {
    navigate("/organizator");
  };

  const handleStartTimeChange = (date) => {
    setStartTime(date);
  };

  const handleEndTimeChange = (date) => {
    setEndTime(date);
  };

  const handleShowDogadjaji = (e) => {
    e.preventDefault();
    setShowDogadjaji(!showDogadjaji);
  };

  return (
    <div className={classes.App}>
      <div className={classes.authFormContainer}>
        <form className={classes.editForm}>
          <label htmlFor="startTime">Pocetak:</label>
          <DatePicker
            selected={startTime}
            onChange={handleStartTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy HH:mm"
            id="startTime"
          />
          <label htmlFor="endTime">Kraj:</label>
          <DatePicker
            selected={endTime}
            onChange={handleEndTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy HH:mm"
            id="endTime"
          />
          <label htmlFor="naziv">Naziv</label>
          <input
            value={konferencija.naziv}
            type="text"
            placeholder="Korisničko ime"
            id="naziv"
          />

          {!showDogadjaji && (
            <button className={classes.prikazi} onClick={handleShowDogadjaji}>
              Prikazi dogadjaje
            </button>
          )}

          {showDogadjaji && (
            <div>
              <h2 className={classes.h2}>Dogadjaji:</h2>
              <ul className={classes.ul}>
                {dogadjaji.map((dogadjaj) => (
                  <li key={dogadjaj.id} className={classes.korisnikItem}>
                    <label htmlFor={`naziv-${dogadjaj.id}`}>Naziv:</label>
                    <input
                      value={dogadjaj.naziv}
                      type="text"
                      id={`naziv-${dogadjaj.id}`}
                    />

                    <label htmlFor={`url-${dogadjaj.id}`}>URL:</label>
                    <input
                      value={dogadjaj.url}
                      type="text"
                      id={`url-${dogadjaj.id}`}
                    />

                    {/* Dodajte ostale inpute za ostale informacije o događaju */}
                  </li>
                ))}
              </ul>
              <button className={classes.sakrij} onClick={handleShowDogadjaji}>
                Sakrij dogadjaje
              </button>
            </div>
          )}

          <button className={classes.btn} type="submit">
            Sacuvaj
          </button>
          <button className={classes.btn} onClick={handleCancel}>
            Odustani
          </button>
        </form>
      </div>
    </div>
  );
};

export default UrediKonferenciju;
