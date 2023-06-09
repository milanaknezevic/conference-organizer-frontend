import {
  azurirajDogadjaj,
  azurirajKonferenciju,
  azurirajRezervacije,
} from "../../../redux/features/organizatorSlice";
import Modal from "../../Modal/Modal";
import classes from "./UrediKonferenciju.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const UrediKonferenciju = (props) => {
  const konferencija = useSelector((state) => state.organizator.izabrana);
  const dogadjaji = konferencija.dogadjajs;
  const user = useSelector((state) => state.login);
  const token = user.user.token;

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
  const [showDogadjaje, setShowDogadjaje] = useState(false);
  const [showRezervacije, setShowRezervacije] = useState(false);
  const [showMess, setShowMess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessRez, setShowMessRez] = useState(false);
  const [messageRez, setMessageRez] = useState("");
  const [showMessKonf, setShowMessKonf] = useState(false);
  const [messageKonf, setMessageKonf] = useState("");
  const [showErrorMess, setShowErrorMess] = useState(false);
  const lokacije = useSelector((state) => state.organizator.lokacije);
  const moderatori = useSelector((state) => state.organizator.moderatori);
  const tipovi_dogadjaja = useSelector(
    (state) => state.organizator.tipoviDogadjaja
  );
  const [moderatorDOgadjaja, setModeratorDOgadjaja] = useState("");
  const [tipDogadjaja, setTipDogadjaja] = useState("");
  const [urlDogadjaja, setUrlDOgadjaja] = useState("");
  const [krajDogadjaja, setKrajDogadjaja] = useState("");
  const [startDogadjaja, setStartDogadjaja] = useState("");
  const [imeDogadjaja, setImeDogadjaja] = useState("");
  const dispatch = useDispatch();
  const [selectedKolicina, setSelectedKolicina] = useState(0);

  useEffect(() => {
    const formattedStartTime = startTimeKonferencije.slice(0, 16); // Izrežemo vremensku zonu
    setStartTimeKonferencije(formattedStartTime);
    const formattedEndtTime = endTimeKonferencija.slice(0, 16); // Izrežemo vremensku zonu
    setEndTimeKonferencija(formattedEndtTime);
    if (expandedDogadjajId !== null) {
      const dogadjaj = dogadjaji.find((dog) => dog.id === expandedDogadjajId);
      const tip1 = parseInt(dogadjaj.tipDogadjaja.id, 10);
      setTipDogadjaja(tip1);
      const moderator1 = parseInt(dogadjaj.korisnik.id, 10);
      setModeratorDOgadjaja(moderator1);
      setImeDogadjaja(dogadjaj.naziv);
      //setStartDogadjaja(dogadjaj.startTime);

      const formattedDogadjajStart = dogadjaj.startTime.slice(0, 16); // Izrežemo vremensku zonu
      setStartDogadjaja(formattedDogadjajStart);
      //setKrajDogadjaja(dogadjaj.endTime);
      const formattedDogadjajEnd = dogadjaj.endTime.slice(0, 16); // Izrežemo vremensku zonu
      setKrajDogadjaja(formattedDogadjajEnd);
      setUrlDOgadjaja(dogadjaj.url);
    }
  }, [lokacije, moderatori, tipovi_dogadjaja, expandedDogadjajId, dogadjaji]);
  const handleUrlDOgadjajaChanged = (value) => {
    setUrlDOgadjaja(value);
  };

  const handleSpremiDogadjaj = () => {
    const dogadjaj = {
      startTime: startDogadjaja,
      endTime: krajDogadjaja,
      naziv: imeDogadjaja,
      url: urlDogadjaja,
      konferencijaId: konferencija.id,
      tipDogadjaja: tipDogadjaja,
      moderator_Id: moderatorDOgadjaja,
    };
    dispatch(
      azurirajDogadjaj({
        token: token,
        dogadjaj: dogadjaj,
        idDogadjaja: expandedDogadjajId,
      })
    )
      .then((response) => {
        setShowMess(true);
        setMessage("Uspješno ste sačuvali izmjene!");
        const timer = setTimeout(() => {
          setShowMess(false);
          setMessage("");
          setExpandedDogadjajId(null);
        }, 1000);
      })
      .catch((error) => {});

    // setShowDogadjaj(false); ovo mozdaaa treba
    // setExpandedDogadjajId(null);
  };

  const handleSpremiResurs = () => {
    const rezervacijaRequest = {
      kolicina: selectedKolicina,
      dogadjajId: expandedDogadjajId,
      resursId: expandedResursId,
    };
    dispatch(
      azurirajRezervacije({
        token: token,
        rezervacijaRequest: rezervacijaRequest,
      })
    )
      .then((response) => {
        setShowMessRez(true);
        setMessageRez("Uspješno ste sačuvali izmjene!");
        const timer = setTimeout(() => {
          setShowMessRez(false);
          setMessageRez("");
          setExpandedResursId(null);
        }, 1000);
      })
      .catch((error) => {});
    // setExpandedResursId(null);
  };
  const handleModalDOgadjaj = (dogadjajId) => {
    setExpandedDogadjajId(dogadjajId);
  };

  const handleModalResurs = (resursId, dogadjajId) => {
    setExpandedResursId(resursId);
    setExpandedDogadjajId(dogadjajId);
  };

  const handleCloseResursModal = () => {
    setExpandedResursId(null);
    //setExpandedDogadjajId(null);
  };

  const handleOdustaniOdDogadjaja = (e) => {
    e.preventDefault();
    setShowInnerModal(false);
    setExpandedDogadjajId(null);
  };

  const handleImeDogadjajaChanged = (value) => {
    setImeDogadjaja(value);
  };

  const handleDogadjaji = (e) => {
    e.preventDefault();
    setShowDogadjaje(!showDogadjaje);
  };
  const handleRezervacije = (e) => {
    e.preventDefault();
    setShowRezervacije(!showRezervacije);
  };

  const handleImeChanged = (e) => {
    setImeKonferencije(e.target.value);
  };

  const handleStartTimeChanged = (e) => {
    setStartTimeKonferencije(e.target.value);
  };

  const handleEndTimeChanged = (e) => {
    const selectedEndTime = e.target.value;
    if (selectedEndTime >= startTimeKonferencije) {
      setEndTimeKonferencija(selectedEndTime);
    }
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
  const handleStartDOgadjajaChanged = (e) => {
    const selectedStartDate = e.target.value;

    setStartDogadjaja(selectedStartDate);
  };

  const handleKrajDOgadjajaChanged = (e) => {
    const selectedEndDate = e.target.value;

    if (selectedEndDate >= startDogadjaja) {
      setKrajDogadjaja(selectedEndDate);
    }
  };

  const handleSave = () => {
    const konferencijaRequest = {
      startTime: startTimeKonferencije,
      endTime: endTimeKonferencija,
      naziv: imeKonferencije,
      url: urlKonferencije,
    };

    dispatch(
      azurirajKonferenciju({
        token: token,
        idKonferencije: konferencija.id,
        konferencijaRequest: konferencijaRequest,
      })
    )
      .then((response) => {
        setShowMessKonf(true);
        setMessageKonf("Uspješno ste sačuvali izmjene!");
        const timer = setTimeout(() => {
          setShowMessKonf(false);
          setMessageKonf("");
          onClose();
          props.onSave();
        }, 1000);
      })
      .catch((error) => {});
  };

  return (
    <Modal>
      <div className={`${classes.userDetailsContainer} ${classes.scrollable}`}>
        <h2 className={classes.naslov}>Uredi {konferencija.naziv}</h2>
        {showErrorMess && <p>Niste napravili izmjene!</p>}

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

          <div>
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
                  min={startTimeKonferencije}
                />
              </div>
            </div>
          </div>

          {konferencija.url && (
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
          )}

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
                          className={`${classes.userDetailsContainer2} ${classes.scrollable}`}
                        >
                          <div className={classes.konfDetails}>
                            <div className={classes.formRow}>
                              <div className={classes.formLabelIme}>
                                <label>
                                  <strong>Ime:</strong>
                                </label>
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
                            </div>
                            <div>
                              <div className={classes.formRow}>
                                <div className={classes.formLabelIme}>
                                  <label>
                                    <strong>Početak:</strong>
                                  </label>
                                </div>
                                <div className={classes.formInputIme}>
                                  <input
                                    value={startDogadjaja}
                                    onChange={handleStartDOgadjajaChanged}
                                    type="datetime-local"
                                    id="startD"
                                    name="startD"
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
                                    value={krajDogadjaja}
                                    onChange={handleKrajDOgadjajaChanged}
                                    type="datetime-local"
                                    id="endD"
                                    name="endD"
                                    min={startDogadjaja}
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              {dogadjaj.url && (
                                <div>
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
                                        handleUrlDOgadjajaChanged(
                                          e.target.value
                                        )
                                      }
                                      type="text"
                                      id="urlDogadjaja"
                                      name="urlDogadjaja"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className={classes.formRowM}>
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
                            <div className={classes.formRowM}>
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
                                              <Modal resurs={expandedResursId}>
                                                {/* Sadržaj moda za prikaz rezervacije */}
                                                <div
                                                  className={
                                                    classes.userResursContainer
                                                  }
                                                >
                                                  <h3>Detalji rezervacije</h3>
                                                  <div
                                                    className={
                                                      classes.prezervacija
                                                    }
                                                  >
                                                    <p>
                                                      Resurs:{" "}
                                                      {rezervacija.resurs.naziv}
                                                    </p>
                                                    <p>
                                                      Količina:{" "}
                                                      {rezervacija.kolicina}
                                                    </p>
                                                  </div>

                                                  <div
                                                    className={
                                                      classes.divZaKolicinu
                                                    }
                                                  >
                                                    <div>
                                                      <label>
                                                        <strong>
                                                          Nova količina :
                                                        </strong>
                                                      </label>
                                                    </div>

                                                    <div
                                                      className={
                                                        classes.formInputIme
                                                      }
                                                    >
                                                      <select
                                                        value={
                                                          selectedKolicina ||
                                                          rezervacija.resurs
                                                            .kolicina
                                                        }
                                                        onChange={(e) => {
                                                          setSelectedKolicina(
                                                            parseInt(
                                                              e.target.value
                                                            )
                                                          );
                                                          // Obrada promene vrednosti selekcije...
                                                        }}
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
                                                  {showMessRez && (
                                                    <diV>
                                                      <p
                                                        className={classes.mess}
                                                      >
                                                        {messageRez}
                                                      </p>
                                                    </diV>
                                                  )}
                                                  <div
                                                    className={
                                                      classes.buttonDOgadjaji
                                                    }
                                                  >
                                                    <button
                                                      className={
                                                        classes.buttonD
                                                      }
                                                      onClick={
                                                        handleSpremiResurs
                                                      }
                                                    >
                                                      Spremi
                                                    </button>
                                                    <button
                                                      className={
                                                        classes.buttonD
                                                      }
                                                      onClick={
                                                        handleCloseResursModal
                                                      }
                                                    >
                                                      Odustani
                                                    </button>
                                                  </div>
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
                            {showMess && (
                              <diV>
                                <p className={classes.mess}>{message}</p>
                              </diV>
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
        {showMessKonf && (
          <diV>
            <p className={classes.mess}>{messageKonf}</p>
          </diV>
        )}
        <div className={classes.buttonDOgadjaji}>
          <button className={classes.buttonD} onClick={handleSave}>
            Spremi
          </button>
          <button className={classes.buttonD} onClick={onClose}>
            Odustani
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UrediKonferenciju;
