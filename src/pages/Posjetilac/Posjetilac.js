import React, { useEffect, useState } from "react";
import { fetchTipoviDogadjaja } from "../../redux/features/organizatorSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Posjetilac.module.css";
import {
  fetchModeratori,
  fetchLokacije,
} from "../../redux/features/organizatorSlice";
import { fetchFilterKonferencije } from "../../redux/features/userSlice";
import OcjenaModal from "../OcjenaModal/OcjenaModal";
import DodajOcjenu from "../OcjenaModal/DodajOcjenu";
import moment from "moment";
import { dodajPosjetioca } from "../../redux/features/posjetilacSlice";
import Resursi from "../Resursi/Resursi";
import Konferencija from "../Konferencija/Konferencija";
import FilterComponent from "../../components/Pretrage/Status/FilterComponent";
import DateComponent from "../../components/Pretrage/Datum/DateComponent";
import SearchComponent from "../../components/Pretrage/Naziv/SearchComponent";
import Posjetioci from "../Posjetioci/Posjetioci";
import { obrisiPosjetioca } from "../../redux/features/posjetilacSlice";

const Posjetilac = () => {
  const [showPosjetiociModal, setShowPosjetiociModal] = useState(false);
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [prijavljeniDogadjaj, setPrijavljeniDogadjaj] = useState(null);
  const [konferencije, setKonferencije] = useState([]);
  const [showModalZaOcjenu, setShowModalZaOcjenu] = useState(false);
  const [showOcjeniModal, setShowOcjeniModal] = useState(false);
  const [dogadjajZaOcjenu, setDogadjajZaOcjenu] = useState({});
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [refreshKey, setRefreshKey] = useState(0);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSucess, setShowSucess] = useState(false);
  const [succesMessage, setSuccesrMessage] = useState("");
  const dispatch = useDispatch();
  const [dogadjajZaResurse, setDogadjajZaResurse] = useState({});
  const [showModalZaResurse, setShowModalZaResurse] = useState(false);
  const [nazivZaPretragu, setNazivZaPretragu] = useState(null);
  const [statusZaPretragu, setStatusZaPretragu] = useState(null);
  const [startTimeZaPretragu, setStartTimeZaPretragu] = useState(null);
  const [endTimeZaPretragu, setEndTimeZaPretragu] = useState(null);
  const [dogadjajZaPosjetioce, setDogadjajZaPosjetioce] = useState({});
  const [showModalZaPokusaj, setShowModalZaPokusaj] = useState(false);

  useEffect(() => {
    dispatch(fetchTipoviDogadjaja(token))
      .then((response) => {})
      .catch((error) => {});
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchModeratori(token))
      .then((response) => {})
      .catch((error) => {});
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchLokacije(token))
      .then((response) => {})
      .catch((error) => {});
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
  const handlePrikaziModalZaResurse = (dogadjaj) => {
    setDogadjajZaResurse(dogadjaj);
    setShowModalZaResurse(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handlePrikaziDogadjaje = (konferencija) => {
    if (selectedKonferencija === konferencija) {
      setSelectedKonferencija(null);
    } else {
      setSelectedKonferencija(konferencija);
    }
    // setShowModalZaPokusaj(true);
  };
  const handleOdjaviSeSaDogadjaja = (dogadjaj) => {
    console.log("odjavi se sa", dogadjaj);
    //posalji zahtjev ka bazi
    dispatch(
      obrisiPosjetioca({
        token: token,
        korisnikId: user.user.id,
        dogadjajId: dogadjaj.id,
      })
    )
      .then((response) => {
        setRefreshKey((prevKey) => prevKey + 1);
        console.log("obrisi posjetioca response", response);
      })
      .catch((error) => {});

    setShowError(true);
    setErrorMessage("Odjavljeni ste sa događaja!");

    setTimeout(() => {
      setShowError(false);
      setErrorMessage("");
    }, 1000); // 1 sekunda
  };
  const handlePrijaviSeNaDogadjaj = (dogadjaj) => {
    console.log("dosla sam da s eprijavim ");

    const currentTime = new Date(); // Trenutno vrijeme
    const currentTimeFormatted = moment(currentTime).format(
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    );

    setPrijavljeniDogadjaj(dogadjaj);
    console.log("current", currentTimeFormatted);
    console.log("dogadjaj", dogadjaj.startTime);
    console.log("", currentTimeFormatted < dogadjaj.startTime);

    if (currentTimeFormatted < dogadjaj.startTime) {
      setShowError(false);

      const posjetilac = {
        korisnikId: user.user.id,
        dogadjajId: dogadjaj.id,
      };

      setShowSucess(true);
      setSuccesrMessage("Prijavljeni ste na događaj!");

      setTimeout(() => {
        setShowSucess(false);
        setSuccesrMessage("");
      }, 1000); // 1 sekunda
      dispatch(dodajPosjetioca({ token: token, posjetilac: posjetilac }))
        .then((response) => {
          setRefreshKey((prevKey) => prevKey + 1);
          console.log("Repsone prijave posjetioca", response);

          console.log("show prijavi psojetioca");
        })
        .catch((error) => {});
    } else {
      setShowSucess(false);
      setShowError(true);
      setErrorMessage("Vrijeme za prijavu je isteklo!");
      setTimeout(() => {
        setShowError(false);
        setErrorMessage("");
      }, 1000); // 1 sekunda
    }

    //setPrijavljeniDogadjaj(null);
  };

  const handlePrikaziModalZaOcjenu = (dogadjaj) => {
    setDogadjajZaOcjenu(dogadjaj);
    setShowModalZaOcjenu(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handleOcjeniModal = (dogadjaj) => {
    setDogadjajZaOcjenu(dogadjaj);
    setShowOcjeniModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handleClose = () => {
    setShowModalZaResurse(false);
    setShowModalZaOcjenu(false);
    setShowOcjeniModal(false);
    setShowPosjetiociModal(false);
    setShowModalZaPokusaj(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleChange = (value) => {
    setStatusZaPretragu(value);
  };
  const onSearch = (value) => {
    setNazivZaPretragu(value);
  };
  const handleDateChange = (dates, dateStrings) => {
    if (dates) {
      const [startDate, endDate] = dates;
      setStartTimeZaPretragu(startDate.toDate());
      setEndTimeZaPretragu(endDate.toDate());
    } else {
      setStartTimeZaPretragu(null);
      setEndTimeZaPretragu(null);
    }
  };

  useEffect(() => {
    const data = {
      status: statusZaPretragu,
      start: startTimeZaPretragu,
      end: endTimeZaPretragu,
      naziv: nazivZaPretragu,
    };
    dispatch(fetchFilterKonferencije({ token: token, data: data }))
      .then((response) => {
        setKonferencije(response.payload);
      })
      .catch((error) => {});
  }, [
    nazivZaPretragu,
    startTimeZaPretragu,
    endTimeZaPretragu,
    statusZaPretragu,
    token,
    refreshKey,
  ]);
  const handlePrikaziPosjetioceModal = (dogadjaj) => {
    setDogadjajZaPosjetioce(dogadjaj);
    setShowPosjetiociModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  return (
    <div className={classes.glavni}>
      <div className={classes.pretraga}>
        <SearchComponent onSearch={onSearch} />
        <FilterComponent handleChange={handleChange} />
        <DateComponent handleDateChange={handleDateChange} />
      </div>
      <h2 className={classes.stilZaH2}>Konferencije</h2>
      <div className={classes.centeredDiv}>
        <ul>
          {konferencije && konferencije.length > 0 ? (
            konferencije.map((konferencija) => (
              <div>
                {" "}
                <Konferencija
                  key={konferencija.id}
                  konferencija={konferencija}
                  classes={classes}
                  formatirajDatum={formatirajDatum}
                  handlePrikaziModalZaOcjenu={handlePrikaziModalZaOcjenu}
                  handlePrikaziDogadjaje={handlePrikaziDogadjaje}
                  selectedKonferencija={selectedKonferencija}
                  handlePrikaziModalZaResurse={handlePrikaziModalZaResurse}
                  handleOcjeniModal={handleOcjeniModal}
                  handlePrijaviSeNaDogadjaj={handlePrijaviSeNaDogadjaj}
                  handleOdjaviSeSaDogadjaja={handleOdjaviSeSaDogadjaja}
                  showSucess={showSucess}
                  succesMessage={succesMessage}
                  showError={showError}
                  errorMessage={errorMessage}
                  prijavljeniDogadjaj={prijavljeniDogadjaj}
                  handlePrikaziPosjetioceModal={handlePrikaziPosjetioceModal}
                />
              </div>
            ))
          ) : (
            <li>Nema konferencija</li>
          )}
        </ul>
        {showModalZaOcjenu && (
          <OcjenaModal
            onClose={handleClose}
            arg={dogadjajZaOcjenu}
            show={showModalZaOcjenu}
          />
        )}
        {showPosjetiociModal && (
          <Posjetioci
            onClose={handleClose}
            dogadjaj={dogadjajZaPosjetioce}
            show={showPosjetiociModal}
          />
        )}
        {showOcjeniModal && (
          <DodajOcjenu
            onClose={handleClose}
            arg={dogadjajZaOcjenu}
            show={showOcjeniModal}
            korisnik={user}
          />
        )}
        {showModalZaResurse && (
          <Resursi
            onClose={handleClose}
            dogadjaj={dogadjajZaResurse}
            show={showModalZaResurse}
          />
        )}
        {showModalZaPokusaj && (
          <Resursi
            onClose={handleClose}
            dogadjaj={dogadjajZaResurse}
            show={showModalZaPokusaj}
          />
        )}
      </div>
    </div>
  );
};

export default Posjetilac;
