import React from "react";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import classes from "./Dogadjaj.module.css";
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
  const [showDetails, setShowDetails] = useState(false);
  const [plusMinusButton, setPlusMinusButton] = useState(true);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setPlusMinusButton(!plusMinusButton);
  };

  useEffect(() => {
    console.log("user", user);
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
    <div>
      <li key={dogadjaj.id} className={classes.lista}>
        <div className={classes.listaDiv}>
          <div className={classes.underlineX}>
            <span className={classes.poljaColor}>Naziv događaja:</span>{" "}
            <span>{dogadjaj.naziv}</span>
          </div>
          <div>
            {handlePrijaviSeNaDogadjaj &&
              dogadjaj.posjetilacs.some(
                (p) => p.korisnik.id === user.user.id
              ) === false &&
              formattedDate(new Date()) < formattedDate(dogadjaj.startTime) && (
                <div>
                  {konferencija.status === false && (
                    <button
                      className={classes.prijavi}
                      title=" Prijavi se na događaj"
                      onClick={() => {
                        handlePrijaviSeNaDogadjaj(dogadjaj);
                      }}
                    >
                      Prijavi se
                    </button>
                  )}
                </div>
              )}
            {handleOdjaviSeSaDogadjaja &&
              dogadjaj.posjetilacs.some(
                (p) => p.korisnik.id === user.user.id
              ) === true &&
              formattedDate(new Date()) < formattedDate(dogadjaj.startTime) && (
                <div>
                  {konferencija.status === false && (
                    <button
                      className={classes.prijavi}
                      title=" Odjavi se sa događaja"
                      onClick={() => {
                        handleOdjaviSeSaDogadjaja(dogadjaj);
                      }}
                    >
                      Odjavi se{" "}
                    </button>
                  )}
                </div>
              )}
          </div>
          <div className={classes.buttonContainer}>
            <button
              title={plusMinusButton ? "Prikaži detalje" : "Sakrij detalje"}
              onClick={toggleDetails}
              className={classes.button}
            >
              {plusMinusButton ? "+" : "-"}
            </button>
          </div>
        </div>
        {showDetails && (
          <div className={classes.sadrzaj}>
            {prijavljeniDogadjaj?.id === dogadjaj.id && showSucess && (
              <div className={classes.successMessage}>{succesMessage}</div>
            )}
            {prijavljeniDogadjaj?.id === dogadjaj.id && showError && (
              <div className={classes.poruka}>{errorMessage}</div>
            )}
            <div className={classes.underlineX}>
              <span className={classes.poljaColor}>Početak:</span>{" "}
              <span>{formatirajDatum(dogadjaj.startTime)}</span>
            </div>
            <div className={classes.underline}>
              <span className={classes.poljaColor}>Kraj:</span>{" "}
              <span>{formatirajDatum(dogadjaj.endTime)}</span>
            </div>
            {dogadjaj.url && (
              <div className={classes.underline}>
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
              <div className={classes.underline}>
                <span className={classes.poljaColor}>Prostorija:</span>{" "}
                <span>{dogadjaj.soba.naziv}</span>
              </div>
            )}
            <div className={classes.underline}>
              <span className={classes.poljaColor}>Tip Dogadjaja:</span>{" "}
              <span>{dogadjaj.tipDogadjaja.naziv}</span>
            </div>
            <div className={classes.underline}>
              <span className={classes.poljaColor}>Moderator:</span>{" "}
              <span>{dogadjaj.korisnik.naziv}</span>
            </div>
            {dogadjaj.rezervacijas && (
              <div className={classes.underline}>
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
        )}
      </li>
    </div>
  );
};

export default Dogadjaj;
