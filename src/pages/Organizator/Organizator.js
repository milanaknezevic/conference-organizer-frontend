import React, { useEffect, useState, useRef } from "react";
import { fetchTipoviDogadjaja } from "../../redux/features/organizatorSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Organizator.module.css";
import Obrisi from "../Obrisi/Obrisi";
import { izabranaKonferencija } from "../../redux/features/organizatorSlice";
import {
  fetchModeratori,
  fetchLokacije,
} from "../../redux/features/organizatorSlice";
import AddConference from "./AddConference/AddConference";
import UrediKonferenciju from "./UrediKonferenciju/UrediKonferenciju";
import Posjetioci from "../Posjetioci/Posjetioci";
import Resursi from "../Resursi/Resursi";
import OcjenaModal from "../OcjenaModal/OcjenaModal";
import Konferencija from "../Konferencija/Konferencija";
import FilterComponent from "../../components/Pretrage/Status/FilterComponent";
import DateComponent from "../../components/Pretrage/Datum/DateComponent";
import SearchComponent from "../../components/Pretrage/Naziv/SearchComponent";
import { fetchFilterKonferencije } from "../../redux/features/userSlice";

const Organizator = () => {
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [konferencije, setKonferencije] = useState([]);
  const [konferencijaZaBrisanje, setKonferencijaZaBrisanje] = useState({});
  const [selectedKonferencija, setSelectedKonferencija] = useState(null); // Dodato stanje za praćenje odabrane konferencije
  const [showModal, setShowModal] = useState(false); // Dodato stanje za prikazivanje modalnog prozora
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPosjetiociModal, setShowPosjetiociModal] = useState(false);
  const [dogadjajZaPosjetioce, setDogadjajZaPosjetioce] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const dispatch = useDispatch();
  const [dogadjajZaResurse, setDogadjajZaResurse] = useState({});
  const [showModalZaResurse, setShowModalZaResurse] = useState(false);
  const [showModalZaOcjenu, setShowModalZaOcjenu] = useState(false);
  const [dogadjajZaOcjenu, setDogadjajZaOcjenu] = useState({});
  const [nazivZaPretragu, setNazivZaPretragu] = useState(null);
  const [statusZaPretragu, setStatusZaPretragu] = useState(null);
  const [startTimeZaPretragu, setStartTimeZaPretragu] = useState(null);
  const [endTimeZaPretragu, setEndTimeZaPretragu] = useState(null);

  /*useEffect(() => {
    dispatch(fetchKonferecnije(token))
      .then((response) => {
        dispatch(setKonferencijeRedux(response.payload));
        setKonferencije(response.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, token, refreshKey]);*/
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
    console.log("konferencije", konferencije);
  }, [
    nazivZaPretragu,
    startTimeZaPretragu,
    endTimeZaPretragu,
    statusZaPretragu,
    token,
    refreshKey,
  ]);

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
  const handlePrikaziModalZaResurse = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    setDogadjajZaResurse(dogadjaj);
    setShowModalZaResurse(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handleClose = () => {
    setShowModalZaOcjenu(false);
    setKonferencijaZaBrisanje([]);
    setShowModalZaResurse(false);
    setShowModal(false);
    setshowAddModal(false);
    setShowEditModal(false);
    setShowPosjetiociModal(false);
  };

  const handleAddConference = () => {
    setshowAddModal(true);
  };
  const handleUredi = (konferencija) => {
    dispatch(izabranaKonferencija(konferencija));
    setShowEditModal(true);
    //navigate("/urediKonferenciju");
  };
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

  const handleObrisi = (konferencija) => {
    setKonferencijaZaBrisanje(konferencija);
    setShowModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };
  const handlePrikaziPosjetioceModal = (dogadjaj) => {
    //setKonferencijaZaBrisanje(konferencija);
    setDogadjajZaPosjetioce(dogadjaj);
    setShowPosjetiociModal(true); // Postavite showModal na true kada se pritisne dugme za brisanje
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
    setDogadjajZaOcjenu(dogadjaj);
    setShowModalZaOcjenu(true); // Postavite showModal na true kada se pritisne dugme za brisanje
  };

  const handleSaveObrisi = () => {
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
                  handleUredi={handleUredi}
                  handleObrisi={handleObrisi}
                  handlePrikaziModalZaResurse={handlePrikaziModalZaResurse}
                  handlePrikaziPosjetioceModal={handlePrikaziPosjetioceModal}
                />
              </div>
            ))
          ) : (
            <li>Nema konferencija</li>
          )}
        </ul>
        {showModal && (
          <Obrisi
            onClose={handleClose}
            konferencija={konferencijaZaBrisanje}
            idKonferencije={konferencijaZaBrisanje.id}
            token={token}
            onSave={handleSaveObrisi}
          />
        )}
        {showAddModal && (
          <AddConference onClose={handleClose} onSave={handleSaveObrisi} />
        )}
        {showEditModal && (
          <UrediKonferenciju onClose={handleClose} onSave={handleSaveObrisi} />
        )}
        {showPosjetiociModal && (
          <Posjetioci
            onClose={handleClose}
            dogadjaj={dogadjajZaPosjetioce}
            show={showPosjetiociModal}
          />
        )}
        {showModalZaResurse && (
          <Resursi
            onClose={handleClose}
            dogadjaj={dogadjajZaResurse}
            show={showModalZaResurse}
          />
        )}
        {showModalZaOcjenu && (
          <OcjenaModal
            onClose={handleClose}
            arg={dogadjajZaOcjenu}
            show={showModalZaOcjenu}
          />
        )}
      </div>

      <div>
        <button
          className={classes.roundButton}
          title="Kreiraj novu konferenciju"
          onClick={handleAddConference}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Organizator;
