import React from "react";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import classes from "./Dogadjaj.module.css";
import { PlusCircleFill, FileMinusFill } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";

const Dogadjaj = ({
  dogadjaj,
  selectedDogadjaj,
  handlePrikaziModalZaResurse,
  handlePrikaziPosjetioceModal,
  handleOdjaviSeSaDogadjaja,
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
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);
  const [showPlus, setShowPlus] = useState(true);
  const [showMinus, setShowMinus] = useState(true);

  useEffect(() => {
    console.log("dogadjaj", dogadjaj.posjetilacs);
    console.log("ulogovani korisnik id", user.user.id);
    const filterPrijave = dogadjaj.posjetilacs.filter(
      (korisnik) => korisnik.korisnik.id === user.user.id
    );
    console.log("filterPrijave", filterPrijave);
    if (filterPrijave.length > 0) {
      setShowMinus(true);
      setShowPlus(false);

      console.log("usla u if");
      console.log("show Plus iz useEffecta", false);
      console.log("show minus iz useEffecta", true);
    } else {
      setShowPlus(true);
      setShowMinus(false);
      console.log("usla u else");
      console.log("show Plus iz useEffecta", true);
      console.log("show minus iz useEffecta", false);
    }
  }, []);
  useEffect(() => {
    if (dogadjaj.url) {
      generateQRCode(dogadjaj.url);
    } else {
      const { id, naziv, startTime, endTime, lokacija, soba } = dogadjaj;
      const data = {
        id: id,
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
  const sakrijPlusDugme = () => {
    setShowPlus(false);
    setShowMinus(true);
    console.log("Sakrila sam plus");
  };
  const sakrijMinusDUgme = () => {
    setShowPlus(true);
    setShowMinus(false);
    console.log("Sakrila sam minus");
  };
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
          {handlePrijaviSeNaDogadjaj && showPlus && (
            <div>
              <div className={classes.prijavi}>
                {konferencija.status === false && (
                  <button
                    title=" Prijavi se na događaj"
                    onClick={() => {
                      handlePrijaviSeNaDogadjaj(dogadjaj);
                      sakrijPlusDugme();
                    }}
                  >
                    <PlusCircleFill className={classes.plus} />
                  </button>
                )}
              </div>
            </div>
          )}
          {handleOdjaviSeSaDogadjaja && showMinus && (
            <div>
              <div className={classes.prijavi}>
                {konferencija.status === false && (
                  <button
                    title=" Odjavi se sa događaja"
                    onClick={() => {
                      handleOdjaviSeSaDogadjaja(dogadjaj);
                      sakrijMinusDUgme();
                    }}
                  >
                    <FileMinusFill className={classes.plus} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {prijavljeniDogadjaj?.id === dogadjaj.id && showSucess && (
          <div className={classes.successMessage}>{succesMessage}</div>
        )}
        {prijavljeniDogadjaj?.id === dogadjaj.id && showError && (
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
        {dogadjaj.resursi && (
          <div className="underline">
            <span className={classes.poljaColor}>Resursi:</span>{" "}
            <span
              className={classes.ocjene}
              onClick={() => handlePrikaziModalZaResurse(dogadjaj)}
            >
              Resursi
            </span>
          </div>
        )}

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
