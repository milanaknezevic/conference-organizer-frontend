import React, { useEffect, useState } from "react";
import {
  fetchKonferecnije,
  fetchTipoviDogadjaja,
} from "../../redux/features/organizatorSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Posjetilac.module.css";
import {
  fetchModeratori,
  fetchLokacije,
} from "../../redux/features/organizatorSlice";
import { fetchFilterKonferencije } from "../../redux/features/userSlice";
import { setKonferencijeRedux } from "../../redux/features/organizatorSlice";
import OcjenaModal from "../OcjenaModal/OcjenaModal";
import DodajOcjenu from "../OcjenaModal/DodajOcjenu";
import moment from "moment";
import { dodajPosjetioca } from "../../redux/features/posjetilacSlice";
import Resursi from "../Resursi/Resursi";
import Konferencija from "../Konferencija/Konferencija";
import FilterComponent from "../../components/Pretrage/Status/FilterComponent";
import DateComponent from "../../components/Pretrage/Datum/DateComponent";
import SearchComponent from "../../components/Pretrage/Naziv/SearchComponent";

const Posjetilac = () => {
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

  //const navigate = useNavigate();

  /* useEffect(() => {
    dispatch(fetchKonferecnije(token))
      .then((response) => {
        dispatch(setKonferencijeRedux(response.payload)); // Ažurirajte stanje pomoću akcije setKonferencije
        setKonferencije(response.payload);
        console.log("dohvatio sam, ovo je response", response);
      })
      .catch((error) => {});
    console.log("trebalo bi dohvatiti konferneicje ponovo");
  }, [dispatch, token, refreshKey]);
*/
  useEffect(() => {
    dispatch(fetchTipoviDogadjaja(token))
      .then((response) => {})
      .catch((error) => {});
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchModeratori(token))
      .then((response) => {
        // dispatch(setModeratori(response.payload)); // Ažurirajte stanje pomoću akcije setModeratori
      })
      .catch((error) => {});
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchLokacije(token))
      .then((response) => {
        // dispatch(setModeratori(response.payload)); // Ažurirajte stanje pomoću akcije setModeratori
      })
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
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaResurse(dogadjaj);
    setShowModalZaResurse(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handlePrikaziDogadjaje = (konferencija) => {
    if (selectedKonferencija === konferencija) {
      setSelectedKonferencija(null);
    } else {
      setSelectedKonferencija(konferencija);
    }
  };
  const handlePrijaviSeNaDogadjaj = (dogadjaj) => {
    const currentTime = new Date(); // Trenutno vrijeme
    const currentTimeFormatted = moment(currentTime).format(
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    );
    console.log(" dogadjaj.endTime,", dogadjaj.endTime);
    console.log(" currentTime,", currentTimeFormatted);
    setPrijavljeniDogadjaj(dogadjaj);
    console.log("dogadjaj", dogadjaj);
    if (currentTimeFormatted < dogadjaj.endTime) {
      setShowError(false);

      const posjetilac = {
        korisnikId: user.user.id,
        dogadjajId: dogadjaj.id,
      };

      console.log("uspjenso si se prijavio na", prijavljeniDogadjaj);
      setShowSucess(true);
      setSuccesrMessage("Prijavljeni ste na dogadjaj!");
      setTimeout(() => {
        setShowSucess(false);
        setSuccesrMessage("");
      }, 1000); // 1 sekunda
      dispatch(dodajPosjetioca({ token: token, posjetilac: posjetilac }))
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {});
    } else {
      console.log("zakasnio si");
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
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaOcjenu(dogadjaj);
    setShowModalZaOcjenu(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handleOcjeniModal = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    console.log("prikazi");
    setDogadjajZaOcjenu(dogadjaj);
    setShowOcjeniModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handleClose = () => {
    setShowModalZaResurse(false);
    setShowModalZaOcjenu(false);
    setShowOcjeniModal(false);
    setRefreshKey((prevKey) => prevKey + 1);
    console.log("nalazim se u onClose() i refreshKey je", refreshKey);
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
      console.log("Početni datum:", startDate.toDate());
      console.log("Završni datum:", endDate.toDate());
    } else {
      console.log("Nije odabran nijedan datum.");
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
    console.log("podaci za bekend", data);
    dispatch(fetchFilterKonferencije({ token: token, data: data }))
      .then((response) => {
        console.log("responseee", response);
        setKonferencije(response.payload);
      })
      .catch((error) => {});
    console.log("na  svaku pormjenu zovi bekend");
    console.log("nazivZaPretragu:", nazivZaPretragu);
    console.log("startTimeZaPretragu:", startTimeZaPretragu);
    console.log("endTimeZaPretragu:", endTimeZaPretragu);
    console.log("statusZaPretragu:", statusZaPretragu);
  }, [
    nazivZaPretragu,
    startTimeZaPretragu,
    endTimeZaPretragu,
    statusZaPretragu,
    token,
    refreshKey,
  ]);
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
                  showSucess={showSucess}
                  succesMessage={succesMessage}
                  showError={showError}
                  errorMessage={errorMessage}
                  prijavljeniDogadjaj={prijavljeniDogadjaj}
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
      </div>
    </div>
  );
};

export default Posjetilac;
