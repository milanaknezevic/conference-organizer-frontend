import React from "react";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import classes from "./Dogadjaj.module.css";
import { PlusCircleFill } from "react-bootstrap-icons";
const Dogadjaj = ({
  dogadjaj,
  selectedDogadjaj,
  handlePrikaziModalZaResurse,
  handlePrikaziPosjetioceModal,
  konferencija,
  formatirajDatum,
  handlePrijaviSeNaDogadjaj,
  showError,
  showSucess,
  errorMessage,
  succesMessage,
  prijavljeniDogadjaj,
}) => {
  const [qrCode, setQRCode] = useState("");
  useEffect(() => {
    if (dogadjaj.url) {
      generateQRCode(dogadjaj.url);
    } else {
      const { naziv, startTime, endTime, lokacija, soba } = dogadjaj;
      const data = {
        naziv: naziv,
        startTime: formattedDate(startTime),
        endTime: formattedDate(endTime),
        lokacija: lokacija.adresa,
        soba: dogadjaj.moderator ? soba.naziv : "",
      };
      generateQRCode(JSON.stringify(data));
    }
  }, [
    dogadjaj.url,
    dogadjaj.naziv,
    dogadjaj.startTime,
    dogadjaj.endTime,
    dogadjaj.lokacija,
    dogadjaj.korisnik,
    dogadjaj.soba,
  ]);
  const formattedDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  const generateQRCode = (text) => {
    QRCode.toDataURL(text, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      setQRCode(url);
    });
  };
  return (
    <li key={dogadjaj.id} className={classes.dogadjaji}>
      <div className={classes.zaDiv}>
        <div className={classes.outerDiv}>
          <div className={classes.eventInfo}>
            <span className={classes.poljaColor}>Naziv događaja:</span>{" "}
            <span>{dogadjaj.naziv}</span>
          </div>
          {handlePrijaviSeNaDogadjaj && (
            <div>
              <div className={classes.prijavi}>
                {konferencija.status === true && (
                  <button
                    title=" Prijavi se na događaj"
                    onClick={() => handlePrijaviSeNaDogadjaj(dogadjaj)}
                  >
                    <PlusCircleFill className={classes.plus} />
                  </button>
                )}
              </div>

              {prijavljeniDogadjaj?.id === dogadjaj.id && showSucess && (
                <div className={classes.poruka}>{succesMessage}</div>
              )}
              {prijavljeniDogadjaj?.id === dogadjaj.id && showError && (
                <div className={classes.poruka}>{errorMessage}</div>
              )}
            </div>
          )}
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
            <a
              href={konferencija.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {konferencija.url}
            </a>
          </div>
        )}
        {dogadjaj.soba && (
          <div className="underline">
            <span className={classes.poljaColor}>Prostorija:</span>{" "}
            <span>{dogadjaj.soba.naziv}</span>
          </div>
        )}
        <div className="underline">
          <span className={classes.poljaColor}>Tip Dogadjaja:</span>{" "}
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
            onClick={() => handlePrikaziModalZaResurse(dogadjaj)}
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
        <div className={classes.qrCodeContainerDogadjaj}>
          <img src={qrCode} alt="QR Code" />
        </div>
      </div>
    </li>
  );
};

export default Dogadjaj;
