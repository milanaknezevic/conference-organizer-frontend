import React, { useEffect, useState } from "react";
import { fetchKonferecnijePosjetioca } from "../../redux/features/posjetilacSlice";
import { fetchKonferecnijeModeratora } from "../../redux/features/moderatorSlice";
import classes from "./MojeKonferencije.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setKonferencijePosjetioca } from "../../redux/features/posjetilacSlice";
import { setKonferencijeModeratora } from "../../redux/features/moderatorSlice";
import OcjenaModal from "../OcjenaModal/OcjenaModal";
import DodajOcjenu from "../OcjenaModal/DodajOcjenu";
import Resursi from "../Resursi/Resursi";
import Konferencija from "../Konferencija/Konferencija";
import FilterComponent from "../../components/Pretrage/Status/FilterComponent";
import DateComponent from "../../components/Pretrage/Datum/DateComponent";
import SearchComponent from "../../components/Pretrage/Naziv/SearchComponent";
import { fetchFilterKonferencijeModeratora } from "../../redux/features/moderatorSlice";
import { fetchFilterKonferencijePosjetioca } from "../../redux/features/posjetilacSlice";

const MojeKonferencije = () => {
  const rez = useSelector((state) => state.login);
  const user = rez.user;
  const token = rez.user.token;
  const [konferencije, setKonferencije] = useState([]);
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [refreshKey, setRefreshKey] = useState(0);
  const [showModalZaOcjenu, setShowModalZaOcjenu] = useState(false);
  const [showOcjeniModal, setShowOcjeniModal] = useState(false);
  const [dogadjajZaOcjenu, setDogadjajZaOcjenu] = useState({});
  const [dogadjajZaResurse, setDogadjajZaResurse] = useState({});
  const [showModalZaResurse, setShowModalZaResurse] = useState(false);
  const [statusZaPretragu, setStatusZaPretragu] = useState(null);
  const [startTimeZaPretragu, setStartTimeZaPretragu] = useState(null);
  const [endTimeZaPretragu, setEndTimeZaPretragu] = useState(null);
  const [nazivZaPretragu, setNazivZaPretragu] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    //ne treba sve vec smao na kojim je on posjetilac tj moderator
    console.log("user", user);
    if (user.rola === "POSJETILAC") {
      console.log("user je posjetilac", user.rola);
      console.log("token", token);
      console.log("user id", user.id);
      const data = {
        status: statusZaPretragu,
        start: startTimeZaPretragu,
        end: endTimeZaPretragu,
        naziv: nazivZaPretragu,
      };
      dispatch(
        fetchFilterKonferencijePosjetioca({
          token: token,
          idPosjetioca: user.id,
          data: data,
        })
      )
        .then((response) => {
          dispatch(setKonferencijePosjetioca(response.payload)); // Ažurirajte stanje pomoću akcije setKonferencije
          setKonferencije(response.payload);
          console.log("response", response);
        })
        .catch((error) => {});
    } else if (user.rola === "MODERATOR") {
      console.log("user je posjetilac", user.rola);
      console.log("token", token);
      console.log("user id", user.id);
      const data = {
        status: statusZaPretragu,
        start: startTimeZaPretragu,
        end: endTimeZaPretragu,
        naziv: nazivZaPretragu,
      };
      dispatch(
        fetchFilterKonferencijeModeratora({
          token: token,
          idModeratora: user.id,
          data: data,
        })
      )
        .then((response) => {
          dispatch(setKonferencijeModeratora(response.payload)); // Ažurirajte stanje pomoću akcije setKonferencije
          setKonferencije(response.payload);
          console.log("response", response);
        })
        .catch((error) => {});
    } else {
      console.log("Error rola nije podrzana");
    }
    console.log("Moje konferencije, ovde bi trebalo da se ponovo dohvae");
  }, [
    dispatch,
    token,
    refreshKey,
    user,
    nazivZaPretragu,
    startTimeZaPretragu,
    endTimeZaPretragu,
    statusZaPretragu,
  ]);

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
    console.log(
      "Nalazim se u onClose() i refresh key je ovo su moje konferenicje",
      refreshKey
    );
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
            korisnik={rez}
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

export default MojeKonferencije;
