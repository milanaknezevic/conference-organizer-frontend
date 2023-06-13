import React from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import Dogadjaj from "../Dogadjaj/Dogadjaj";
import classes from "./Konferencija.module.css";
import { useSelector } from "react-redux";
import Pokusaj from "../Pokusaj/Pokusaj";
const Konferencija = ({
  konferencija,

  formatirajDatum,
  handlePrikaziModalZaOcjenu,
  handlePrikaziDogadjaje,
  selectedKonferencija,
  handlePrikaziModalZaResurse,
  handlePrikaziPosjetioceModal,
  handleOdjaviSeSaDogadjaja,
  selectedDogadjaj,
  handleUredi,
  handleObrisi,
  handleOcjeniModal,
  handlePrijaviSeNaDogadjaj,
  showError,
  showSucess,
  errorMessage,
  succesMessage,
  prijavljeniDogadjaj,
}) => {
  const [qrCode, setQRCode] = useState("");
  const [showOcjeni, setShowOcjeni] = useState(false);
  const user = useSelector((state) => state.login);
  useEffect(() => {
    const filterOcjene = konferencija.ocjenas.filter(
      (korisnik) => korisnik.korisnik.id === user.user.id
    );

    if (filterOcjene.length > 0) {
      setShowOcjeni(false);
    } else {
      setShowOcjeni(true);
    }

    if (konferencija.url) {
      generateQRCode(konferencija.url);
    } else {
      const { id, naziv, startTime, endTime, lokacija, soba } = konferencija;
      const data = {
        id: id,
        naziv: naziv,
        startTime: formattedDate(startTime),
        endTime: formattedDate(endTime),
        lokacija: lokacija.adresa,
        soba: konferencija.moderator ? soba.naziv : "",
      };
      generateQRCode(JSON.stringify(data));
    }
  }, [
    konferencija.url,
    konferencija.naziv,
    konferencija.startTime,
    konferencija.endTime,
    konferencija.lokacija,
    konferencija.korisnik,
    konferencija.soba,
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
    <div className={classes.organizatorContainer}>
      <li key={konferencija.id} className={classes.organizator}>
        <div className={classes.pom}>
          <div className="underline">
            <span className={classes.poljaColor}>Naziv: </span>{" "}
            <span> {konferencija.naziv}</span>
          </div>
          <div className="underline">
            <span className={classes.poljaColor}>Početak: </span>{" "}
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
              <a
                href={konferencija.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {konferencija.url}
              </a>
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
          {handleOcjeniModal && showOcjeni && (
            <div className={classes.ocjeni}>
              {konferencija.status === true && (
                <button onClick={() => handleOcjeniModal(konferencija)}>
                  Ocjeni
                </button>
              )}
            </div>
          )}
          {selectedKonferencija === konferencija && (
            <ul>
              {konferencija.dogadjajs.length > 0 ? (
                konferencija.dogadjajs.map((dogadjaj) => (
                  <Dogadjaj
                    key={dogadjaj.id}
                    dogadjaj={dogadjaj}
                    selectedDogadjaj={selectedDogadjaj}
                    classes={classes}
                    konferencija={konferencija}
                    formatirajDatum={formatirajDatum}
                    handlePrikaziModalZaResurse={handlePrikaziModalZaResurse}
                    handlePrikaziPosjetioceModal={handlePrikaziPosjetioceModal}
                    handlePrijaviSeNaDogadjaj={handlePrijaviSeNaDogadjaj}
                    handleOdjaviSeSaDogadjaja={handleOdjaviSeSaDogadjaja}
                    showSucess={showSucess}
                    succesMessage={succesMessage}
                    showError={showError}
                    errorMessage={errorMessage}
                    prijavljeniDogadjaj={prijavljeniDogadjaj}
                  />
                ))
              ) : (
                <p className={classes.praznaLista}>Nema dogadjaja!</p>
              )}
            </ul>
          )}
        </div>

        {handleObrisi && (
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
        )}

        <div className={classes.qrCodeContainerPosjetilac}>
          <img src={qrCode} alt="QR Code" />
        </div>
      </li>
    </div>
  );
};

export default Konferencija;
