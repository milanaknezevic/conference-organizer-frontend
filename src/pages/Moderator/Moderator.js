import React, { useEffect, useState } from "react";
import {
  fetchKonferecnije,
  fetchTipoviDogadjaja,
} from "../../redux/features/organizatorSlice";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Moderator.module.css";
import {
  fetchModeratori,
  fetchLokacije,
} from "../../redux/features/organizatorSlice";
import { setKonferencijeRedux } from "../../redux/features/organizatorSlice";
import OcjenaModal from "../OcjenaModal/OcjenaModal";
import DodajOcjenu from "../OcjenaModal/DodajOcjenu";
import { Plus, PlusCircleFill } from "react-bootstrap-icons";
import moment from "moment";
import { dodajPosjetioca } from "../../redux/features/posjetilacSlice";
import MojeKonferencije from "../MojeKonferencije/MojeKonferencije";

const Moderator = () => {
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

  //const navigate = useNavigate();

  /* useEffect(() => {
    dispatch(fetchKonferecnije(token))
      .then((response) => {
        dispatch(setKonferencijeRedux(response.payload)); // Ažurirajte stanje pomoću akcije setKonferencije
        setKonferencije(response.payload);
      })
      .catch((error) => {});
  }, [dispatch, token, refreshKey]);*/

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
    setShowModalZaOcjenu(false);
    setShowOcjeniModal(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <div className={classes.centeredDiv}>
        <MojeKonferencije />
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
      </div>
    </div>
  );
};

export default Moderator;
