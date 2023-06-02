import { azurirajDogadjaj } from "../../../redux/features/organizatorSlice";
import Modal from "../../Modal/Modal";
//import classes from "../../AddConference/AddConference.module.css";
import classes from "./UrediKonferenciju.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const UrediKonferenciju = (props) => {
  const konferencija = useSelector((state) => state.organizator.izabrana);
  const dogadjaji = konferencija.dogadjajs;
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [nizDOgadjaja, setNizDOgadjaja] = useState([]);
  const [expandedDogadjajId, setExpandedDogadjajId] = useState(null);
  const [expandedResursId, setExpandedResursId] = useState(null);
  const { onClose } = props;
  const [imeKonferencije, setImeKonferencije] = useState(konferencija.naziv);
  const [startTimeKonferencije, setStartTimeKonferencije] = useState(
    konferencija.startTime
  );
  const [showInnerModal, setShowInnerModal] = useState(false);
  const [endTimeKonferencija, setEndTimeKonferencija] = useState(
    konferencija.endTime
  );
  const [urlKonferencije, setUrlKonferencije] = useState(konferencija.url);

  const [lokacijaKonferencije, setLokacijaKonferencije] = useState(
    konferencija.lokacija
  );
  const [showDogadjaje, setShowDogadjaje] = useState(false);
  const [showRezervacije, setShowRezervacije] = useState(false);
  const [showDogadjaj, setShowDogadjaj] = useState(false);

  const [showErrorMess, setShowErrorMess] = useState(false);
  //ostane broj lokacija trebala bih ovde citati iz baze ispocetka svaki put
  const lokacije = useSelector((state) => state.organizator.lokacije);
  const moderatori = useSelector((state) => state.organizator.moderatori);
  const tipovi_dogadjaja = useSelector(
    (state) => state.organizator.tipoviDogadjaja
  );

  const [resursDogadjaja, setResursDOgadjaja] = useState("");

  const [moderatorDOgadjaja, setModeratorDOgadjaja] = useState("");
  const [tipDogadjaja, setTipDogadjaja] = useState("");
  const [urlDogadjaja, setUrlDOgadjaja] = useState("");
  const [krajDogadjaja, setKrajDogadjaja] = useState("");
  const [startDogadjaja, setStartDogadjaja] = useState("");
  const [imeDogadjaja, setImeDogadjaja] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("expanded dogadjaj ", expandedDogadjajId);
    if (expandedDogadjajId !== null) {
      const dogadjaj = dogadjaji.find((dog) => dog.id === expandedDogadjajId);
      console.log("dogadjaj", dogadjaj);
      const tip1 = parseInt(dogadjaj.tipDogadjaja.id, 10);
      setTipDogadjaja(tip1);
      const moderator1 = parseInt(dogadjaj.korisnik.id, 10);
      setModeratorDOgadjaja(moderator1);
      setImeDogadjaja(dogadjaj.naziv);
      setStartDogadjaja(dogadjaj.startTime);
      setKrajDogadjaja(dogadjaj.endTime);
      setUrlDOgadjaja(dogadjaj.url);
    }
  }, [
    lokacije,
    resursDogadjaja,
    moderatori,
    tipovi_dogadjaja,
    lokacijaKonferencije,
    expandedDogadjajId,
  ]);
  const handleUrlDOgadjajaChanged = (value) => {
    setUrlDOgadjaja(value);
  };

  const zatvori = () => {
    // setShowDogadjaje(false);
    setShowInnerModal(false);
    setExpandedDogadjajId(null);
    console.log("zatvori");
  };
  const handleSpremiDogadjaj = () => {
    console.log("startDogadjaja", startDogadjaja);
    console.log("krajDogadjaja", krajDogadjaja);
    console.log("imeDogadjaja", imeDogadjaja);
    console.log("urlDOgadjaja", urlDogadjaja);
    console.log("id konf", konferencija.id);
    console.log("tip dogadjaja", tipDogadjaja);
    console.log("lokacija konf", konferencija.lokacija);
    console.log("moderator dogadjaja", moderatorDOgadjaja);

    const dogadjaj = {
      startTime: startDogadjaja,
      endTime: krajDogadjaja,
      naziv: imeDogadjaja,
      url: urlDogadjaja,
      konferencijaId: konferencija.id,
      tipDogadjaja: tipDogadjaja,
      moderator_Id: moderatorDOgadjaja,
    };

    // setNizDOgadjaja((prevNiz) => [...prevNiz, noviDogadjaj]);

    console.log("dokadjaj Za bekend", dogadjaj);
    console.log("idDOgadjaja", expandedDogadjajId);

    dispatch(
      azurirajDogadjaj({
        token: token,
        dogadjaj: dogadjaj,
        idDogadjaja: expandedDogadjajId,
      })
    )
      .then((response) => {
        console.log("rezultat dogadjaja", response);
      })
      .catch((error) => {});

    /* setImeDogadjaja("");
    setStartDogadjaja("");
    setKrajDogadjaja("");
    setUrlDOgadjaja("");

    setModeratorDOgadjaja("");
    setTipDogadjaja("");
    setShowDogadjaj(false);*/
  };
  const handleModalDOgadjaj = (dogadjajId) => {
    console.log("otvori ");
    setExpandedDogadjajId(dogadjajId);
  };

  const handleModalResurs = (resursId, dogadjajId) => {
    setExpandedResursId(resursId);
    setExpandedDogadjajId(dogadjajId);
    console.log("rezervacijaId ", resursId);
    console.log("dogadjajId ", dogadjajId);
  };

  const handleCloseResursModal = () => {
    setExpandedResursId(null);
    setExpandedDogadjajId(null);
  };

  const handleOdustaniOdDogadjaja = (e) => {
    e.preventDefault();
    /*if (expandedDogadjajId !== null) {
      const dogadjaj = dogadjaji.find((dog) => dog.id === expandedDogadjajId);
      console.log("dogadjaj", dogadjaj);
      setTipDogadjaja(dogadjaj.tipDogadjaja);
      setModeratorDOgadjaja(dogadjaj.korisnik);
      setImeDogadjaja(dogadjaj.naziv);
      setStartDogadjaja(dogadjaj.startTime);
      setKrajDogadjaja(dogadjaj.endTime);
      setUrlDOgadjaja(dogadjaj.url);
      console.log("dogadjaj", dogadjaj);
    }*/
    setShowDogadjaj(false);
    setShowInnerModal(false);
    setExpandedDogadjajId(null);
  };
  const handleImeDogadjajaChanged = (value) => {
    setImeDogadjaja(value);
  };

  const handleDogadjaji = (e) => {
    e.preventDefault();
    setShowDogadjaje(!showDogadjaje);
    // setShowInnerModal(true);
    console.log("show inner", showInnerModal);
  };
  const handleRezervacije = (e) => {
    e.preventDefault();
    setShowRezervacije(!showRezervacije);
  };
  const handleSelectedDogadjaj = (e) => {
    e.preventDefault();

    setShowDogadjaj(!showDogadjaj);
  };

  const handleImeChanged = (e) => {
    setImeKonferencije(e.target.value);
  };

  const handleStartTimeChanged = (e) => {
    setStartTimeKonferencije(e.target.value);
  };

  const handleEndTimeChanged = (e) => {
    setEndTimeKonferencija(e.target.value);
  };

  const handleUrlChanged = (e) => {
    setUrlKonferencije(e.target.value);
  };

  const handleModeratorChange = (e) => {
    const moderator1 = parseInt(e.target.value, 10);
    setModeratorDOgadjaja(moderator1);
  };
  const handleTipDOgadjajaChanged = (e) => {
    const tip1 = parseInt(e.target.value, 10);
    setTipDogadjaja(tip1);
  };
  const handleKrajDOgadjajaChanged = (e) => {
    setKrajDogadjaja(e.target.value);
  };
  const handleStartDOgadjajaChanged = (e) => {
    setStartDogadjaja(e.target.value);
  };

  const handleSave = async () => {};

  return (
    <Modal>
      <div className={`${classes.userDetailsContainer} ${classes.scrollable}`}>
        <h2 style={{ color: "red" }}>
          Uredi <span style={{ color: "blue" }}>{konferencija.naziv}</span>
        </h2>
        {showErrorMess && <p>Oznacite url ili lokaciju konferencije!</p>}
        <div className={classes.konfDetails}>
          <div className={classes.formRow}>
            <div className={classes.formLabelIme}>
              <label>
                <strong>Ime:</strong>
              </label>
            </div>
            <div className={classes.formInputIme}>
              <input
                value={imeKonferencije}
                onChange={handleImeChanged}
                type="text"
                id="ime"
                name="ime"
              />
            </div>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formLabelIme}>
              <label>
                <strong>Početak:</strong>
              </label>
            </div>
            <div className={classes.formInputIme}>
              <input
                value={startTimeKonferencije}
                onChange={handleStartTimeChanged}
                type="datetime-local"
                id="startTime"
                name="startTime"
              />
            </div>
          </div>
          <div className={classes.formRow}>
            <div className={classes.formLabelIme}>
              <label>
                <strong>Kraj:</strong>
              </label>
            </div>
            <div className={classes.formInputIme}>
              <input
                value={endTimeKonferencija}
                onChange={handleEndTimeChanged}
                type="datetime-local"
                id="endTime"
                name="endTime"
              />
            </div>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formLabelIme}>
              <label>
                <strong>Url:</strong>
              </label>
            </div>
            <div className={classes.formInputIme}>
              <input
                value={urlKonferencije}
                onChange={handleUrlChanged}
                type="text"
                id="url"
                name="url"
              />
            </div>
          </div>

          <div className={classes.dogadjajiHeader}>
            <span>Dogadjaji </span>
            <button className={classes.plusButton} onClick={handleDogadjaji}>
              {showDogadjaje ? "-" : "+"}
            </button>
          </div>
          {showDogadjaje && (
            <ul className={classes.zaUl}>
              {dogadjaji.length > 0 &&
                dogadjaji.map((dogadjaj) => (
                  <li>
                    <div className={classes.dogadjajiHeader}>
                      <span>{dogadjaj.naziv}</span>
                      <button
                        className={classes.plusButton}
                        onClick={() => handleModalDOgadjaj(dogadjaj.id)} // Dodajte onClick događaj za otvaranje moda
                      >
                        {expandedDogadjajId === dogadjaj.id ? "-" : "+"}
                      </button>
                    </div>
                    {expandedDogadjajId === dogadjaj.id && (
                      <Modal>
                        <div
                          className={`${classes.userDetailsContainer} ${classes.scrollable}`}
                        >
                          <div className={classes.konfDetails}>
                            <div className={classes.formRow}>
                              <div className={classes.formLabelIme}>
                                <label>
                                  <strong>Ime:</strong>
                                </label>
                              </div>
                            </div>
                            <div className={classes.formInputIme}>
                              <input
                                value={imeDogadjaja}
                                onChange={(e) =>
                                  handleImeDogadjajaChanged(e.target.value)
                                }
                                type="text"
                                id="imeDOgadjaja"
                                name="imeDOgadjaja"
                              />
                            </div>

                            <div className={classes.formRow}>
                              <div className={classes.formLabelIme}>
                                <label>
                                  <strong>Početak:</strong>
                                </label>
                              </div>
                            </div>
                            <div className={classes.formInputIme}>
                              <input
                                value={startDogadjaja}
                                onChange={handleStartDOgadjajaChanged}
                                type="datetime-local"
                                id="startDogadjaja"
                                name="startDogadjaja"
                              />
                            </div>

                            <div className={classes.formRow}>
                              <div className={classes.formLabelIme}>
                                <label>
                                  <strong>Kraj:</strong>
                                </label>
                              </div>
                            </div>
                            <div className={classes.formInputIme}>
                              <input
                                value={krajDogadjaja}
                                onChange={handleKrajDOgadjajaChanged}
                                type="datetime-local"
                                id="krajDogadjaja"
                                name="krajDogadjaja"
                              />
                            </div>
                            <div className={classes.formRow}>
                              <div className={classes.formLabelIme}>
                                <label>
                                  <strong>Url:</strong>
                                </label>
                              </div>
                            </div>
                            <div className={classes.formInputIme}>
                              <input
                                value={urlDogadjaja}
                                onChange={(e) =>
                                  handleUrlDOgadjajaChanged(e.target.value)
                                }
                                type="text"
                                id="urlDogadjaja"
                                name="urlDogadjaja"
                              />
                            </div>
                            <div className={classes.formRow}>
                              <div className={classes.formselectLabel}>
                                <label>
                                  <strong>Moderator:</strong>
                                </label>
                              </div>
                              <div className={classes.formInputIme}>
                                <select
                                  className={classes.selekt}
                                  onChange={handleModeratorChange}
                                >
                                  {moderatori.map((moderator) => (
                                    <option
                                      key={moderator.id}
                                      value={moderator.id}
                                    >
                                      {moderator.naziv}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className={classes.formRow}>
                              <div className={classes.formselectLabel}>
                                <label>
                                  <strong>Tip Dogadjaja:</strong>
                                </label>
                              </div>
                              <div className={classes.formInputIme}>
                                <select
                                  className={classes.selekt}
                                  onChange={handleTipDOgadjajaChanged}
                                >
                                  {tipovi_dogadjaja.map((tip) => (
                                    <option key={tip.id} value={tip.id}>
                                      {tip.naziv}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className={classes.dogadjajiHeader}>
                              <span>Rezervacije </span>
                              <button
                                className={classes.plusButton}
                                onClick={handleRezervacije}
                              >
                                {showRezervacije ? "-" : "+"}
                              </button>
                            </div>

                            {showRezervacije &&
                              expandedDogadjajId === dogadjaj.id && (
                                <>
                                  {dogadjaj.rezervacijas.length > 0 ? (
                                    <ul
                                      className={`${classes.zaUlResursa} ${
                                        expandedResursId ? classes.pom : ""
                                      }`}
                                    >
                                      {dogadjaj.rezervacijas.map(
                                        (rezervacija) => (
                                          <li key={rezervacija.id}>
                                            <div
                                              className={
                                                classes.dogadjajiHeader
                                              }
                                            >
                                              <span>
                                                {rezervacija.resurs.naziv}
                                              </span>
                                              <button
                                                className={classes.plusButton}
                                                onClick={() =>
                                                  handleModalResurs(
                                                    rezervacija.resurs.id,
                                                    dogadjaj.id
                                                  )
                                                }
                                              >
                                                {expandedResursId ===
                                                rezervacija.resurs.id
                                                  ? "-"
                                                  : "+"}
                                              </button>
                                            </div>

                                            {expandedResursId ===
                                              rezervacija.resurs.id && (
                                              <Modal>
                                                {/* Sadržaj moda za prikaz rezervacije */}
                                                <div
                                                  className={
                                                    classes.userResursContainer
                                                  }
                                                >
                                                  <h3>Detalji rezervacije</h3>
                                                  <p>
                                                    Resurs:{" "}
                                                    {rezervacija.resurs.naziv}
                                                  </p>
                                                  <p>
                                                    Količina:{" "}
                                                    {rezervacija.kolicina}
                                                  </p>

                                                  <div
                                                    className={
                                                      classes.formResurs
                                                    }
                                                  >
                                                    <div
                                                      className={
                                                        classes.formLabelIme
                                                      }
                                                    >
                                                      <label>
                                                        <strong>
                                                          {
                                                            rezervacija.resurs
                                                              .naziv
                                                          }
                                                          :
                                                        </strong>
                                                      </label>
                                                    </div>

                                                    <div
                                                      className={
                                                        classes.formInputIme
                                                      }
                                                    >
                                                      <select
                                                        className={
                                                          classes.selekt
                                                        }
                                                        defaultValue={
                                                          rezervacija.resurs
                                                            .kolicina
                                                        }
                                                      >
                                                        {Array.from(
                                                          {
                                                            length:
                                                              rezervacija.resurs
                                                                .kolicina,
                                                          },
                                                          (_, index) => (
                                                            <option
                                                              key={index + 1}
                                                              value={index + 1}
                                                            >
                                                              {index + 1}
                                                            </option>
                                                          )
                                                        )}
                                                      </select>
                                                    </div>
                                                  </div>

                                                  <button
                                                    onClick={
                                                      handleCloseResursModal
                                                    }
                                                  >
                                                    Zatvori
                                                  </button>
                                                </div>
                                              </Modal>
                                            )}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    <p>
                                      Nema dostupnih rezervacija za ovaj
                                      događaj.
                                    </p>
                                  )}
                                </>
                              )}

                            <div className={classes.buttonDOgadjaji}>
                              <button
                                className={classes.buttonD}
                                onClick={handleSpremiDogadjaj}
                              >
                                Spremi
                              </button>
                              <button
                                className={classes.buttonD}
                                onClick={handleOdustaniOdDogadjaja}
                              >
                                Odustani
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className={classes.buttonContainer}>
          <button onClick={handleSave}>Da</button>
          <button onClick={onClose}>Ne</button>
        </div>
      </div>
    </Modal>
  );
};

export default UrediKonferenciju;
