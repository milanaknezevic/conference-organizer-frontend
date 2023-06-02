import {
  setTipoviDogadjaja,
  dodajKonferenciju,
  dodajDogadjaj,
  dodajResurs,
} from "../../../redux/features/organizatorSlice";
import Modal from "../../Modal/Modal";
import classes from "./AddConference.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddConference = (props) => {
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [nizDOgadjaja, setNizDOgadjaja] = useState([]);
  const [nizResursa, setNizResursa] = useState([]);

  const [dogadjajIsOnline, setDogadjajIsOnline] = useState(false);
  const [lokacijuPrikazi, setLokacijuPrikazi] = useState(false);
  const [kolicinaResursa, setKolicinaResursa] = useState(0);

  const { onClose } = props;
  const [imeKonferencije, setImeKonferencije] = useState("");
  const [startTimeKonferencije, setStartTimeKonferencije] = useState("");
  const [endTimeKonferencija, setEndTimeKonferencija] = useState("");
  const [urlKonferencije, setUrlKonferencije] = useState("");
  const [urlKonfChecked, setUrlKonfChecked] = useState(false);
  const [lokacijaKonferencije, setLokacijaKonferencije] = useState("");
  const [lokacijaKonfChecked, setLokacijaKonfChecked] = useState(false);
  const [showDogadjaje, setShowDogadjaje] = useState(false);
  const [showResurse, setShowResurse] = useState(false);

  const [showErrorMess, setShowErrorMess] = useState(false);
  //ostane broj lokacija trebala bih ovde citati iz baze ispocetka svaki put
  const lokacije = useSelector((state) => state.organizator.lokacije);
  const moderatori = useSelector((state) => state.organizator.moderatori);
  const tipovi_dogadjaja = useSelector(
    (state) => state.organizator.tipoviDogadjaja
  );
  const [selectedLocation, setSelectedLocation] = useState({});
  const [imeDOgadjaja, setImeDogadjaja] = useState("");
  const [startTimeDogadjaja, setStartTimeDogadjaja] = useState("");
  const [endTimeDogadjaja, setEndTimeDogadjaja] = useState("");
  const [urlDogadjaja, setUrlDogadjaja] = useState("");
  const [sobaDogadjaja, setSobaDogadjaja] = useState("");
  const [resursDogadjaja, setResursDOgadjaja] = useState("");

  const [moderatorDOgadjaja, setModeratorDOgadjaja] = useState("");
  const [tipDogadjaja, tsetTipDogadjaja] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("resurs iz use effect", resursDogadjaja);
  }, [
    lokacije,
    resursDogadjaja,
    moderatori,
    tipovi_dogadjaja,
    lokacijaKonferencije,
  ]);
  const handleDogadjaji = (e) => {
    e.preventDefault();
    if (lokacijaKonfChecked || urlKonfChecked) {
      if (lokacijaKonferencije === "" && urlKonferencije === "") {
        setShowErrorMess(true);
        setShowDogadjaje(false);
      } else {
        setShowErrorMess(false);
        setShowDogadjaje(!showDogadjaje);
      }
    } else {
      setShowErrorMess(true);
      if (showDogadjaje) {
        setShowDogadjaje(false);
      }
    }
  };

  const handleSpremiResurs = (e) => {
    if (resursDogadjaja === "" || kolicinaResursa === "") {
    } else {
      const noviResurs = {
        kolicina: kolicinaResursa,
        dogadjajId: "",
        resursId: resursDogadjaja,
      };

      setNizResursa((prevNiz) => [...prevNiz, noviResurs]);
      setResursDOgadjaja("");
      setKolicinaResursa(0);

      setShowResurse(false);
    }
  };
  const handleResurskolicinaChanged = (e) => {
    console.log("kolicina", e.target.value);
    setKolicinaResursa(e.target.value);
  };

  const hadnleResursi = (e) => {
    e.preventDefault();

    setShowResurse(!showResurse);
  };
  const handleImeChanged = (e) => {
    setImeKonferencije(e.target.value);
  };
  const handleImeDOgadjaja = (e) => {
    setImeDogadjaja(e.target.value);
  };

  const handleStartTimeChanged = (e) => {
    setStartTimeKonferencije(e.target.value);
  };
  const handleStartTimeDogadjaja = (e) => {
    setStartTimeDogadjaja(e.target.value);
  };

  const handleEndTimeChanged = (e) => {
    setEndTimeKonferencija(e.target.value);
  };
  const handleEndTimeDogadjaja = (e) => {
    setEndTimeDogadjaja(e.target.value);
  };

  const handleUrlChanged = (e) => {
    setUrlKonferencije(e.target.value);
    setLokacijaKonferencije("");
  };
  const handleUrlDOgadjaja = (e) => {
    setUrlDogadjaja(e.target.value);
  };

  const handleLokacijaChanged = (e) => {
    const selectedLocationId = e.target.value;
    setLokacijaKonferencije(selectedLocationId);
    setUrlKonferencije("");

    const selectedLocationId2 = parseInt(e.target.value, 10); // Pretvori u numerički tip
    setLokacijaKonferencije(selectedLocationId2);

    const selectedLocation1 = lokacije.find(
      (lokacija) => lokacija.id === selectedLocationId2
    );
    setSelectedLocation(selectedLocation1);
    console.log("selectedLocation", selectedLocation);
    console.log("resursi na lokaciji", selectedLocation.resurs);

    setUrlKonferencije("");
  };
  const handleSObaChanged = (e) => {
    const selectedSoba2 = parseInt(e.target.value, 10);
    setSobaDogadjaja(selectedSoba2);
  };
  const handleResursChanged = (e) => {
    const selectedSoba2 = parseInt(e.target.value, 10);
    setResursDOgadjaja(selectedSoba2);
    console.log("resurs", resursDogadjaja);
    setKolicinaResursa("");
  };

  const handleModeratorChanged = (e) => {
    const moder2 = parseInt(e.target.value, 10);
    setModeratorDOgadjaja(moder2);
  };
  const handleTipDogadjajaCHnaged = (e) => {
    const tip2 = parseInt(e.target.value, 10);
    tsetTipDogadjaja(tip2);
  };

  const handleUrlCheckboxChanged = () => {
    setUrlKonfChecked(!urlKonfChecked);
    setLokacijaKonfChecked(false);
  };
  const handleOdustani = () => {
    setImeDogadjaja("");
    setStartTimeDogadjaja("");
    setEndTimeDogadjaja("");
    setUrlDogadjaja("");
    setSobaDogadjaja("");
    setModeratorDOgadjaja("");
    setTipoviDogadjaja("");
    setShowDogadjaje(false);
  };

  const handleLokacijaCheckboxChanged = () => {
    setLokacijaKonfChecked(!lokacijaKonfChecked);
    setUrlKonfChecked(false);
  };
  const handleSpremiDogadjaj = () => {
    if (
      imeDOgadjaja === "" ||
      startTimeDogadjaja === "" ||
      endTimeDogadjaja === "" ||
      moderatorDOgadjaja === "" ||
      (tipDogadjaja === "" && (sobaDogadjaja === "" || urlDogadjaja === ""))
    ) {
    } else {
      const noviDogadjaj = {
        startTime: startTimeDogadjaja,
        endTime: endTimeDogadjaja,
        naziv: imeDOgadjaja,
        url: urlDogadjaja,
        konferencijaId: "",
        tipDogadjaja: tipDogadjaja,
        lokacijaId: lokacijaKonferencije,
        sobaId: sobaDogadjaja,
        moderator_Id: moderatorDOgadjaja,
        resursi: nizResursa,
      };
      if (urlDogadjaja === "") {
        setDogadjajIsOnline(false);
        setLokacijuPrikazi(true);
      } else {
        setDogadjajIsOnline(true);
        setLokacijuPrikazi(false);
      }

      setNizDOgadjaja((prevNiz) => [...prevNiz, noviDogadjaj]);
      setNizResursa([]);

      setImeDogadjaja("");
      setStartTimeDogadjaja("");
      setEndTimeDogadjaja("");
      setUrlDogadjaja("");
      setSobaDogadjaja("");
      setModeratorDOgadjaja("");
      setTipoviDogadjaja("");
      setShowDogadjaje(false);
    }
  };
  const handleSave = async () => {
    const konferencijaRequest = {
      naziv: imeKonferencije,
      startTime: startTimeKonferencije,
      endTime: endTimeKonferencija,
      url: urlKonferencije,
      organizatorId: user.user.id,
      lokacijaId: lokacijaKonferencije,
    };
    console.log("nizDOgadjaja", nizDOgadjaja);
    const noviNiz = nizDOgadjaja.map(
      ({ resursi, ...ostaliAtributi }) => ostaliAtributi
    );
    console.log("noviNiz", noviNiz);
    const conf = await dispatch(
      dodajKonferenciju({
        token: token,
        konferencijaRequest: konferencijaRequest,
      })
    );
    console.log("id konferencije", conf.payload.id);
    for (let dogadjaj of noviNiz) {
      dogadjaj.konferencijaId = conf.payload.id;
    }
    /* console.log("noviNiz", noviNiz);
    for (let dogadjaj of noviNiz) {
      const responseDog = await dispatch(
        dodajDogadjaj({
          token: token,
          dogadjajRequest: dogadjaj,
        })
      );
      console.log("dog", responseDog);
    }*/

    for (let i = 0; i < noviNiz.length; i++) {
      const dogadjajRequest = noviNiz[i];
      console.log("dogadjaj jedan po jedan", dogadjajRequest);
      const responseDog = await dispatch(
        dodajDogadjaj({
          token: token,
          dogadjajRequest: dogadjajRequest,
        })
      );
      console.log("dogadjaj ID", responseDog.payload.id);
      for (let resurs of nizDOgadjaja[i].resursi) {
        console.log("ovo citaaaj", responseDog);
        resurs.dogadjajId = responseDog.payload.id;
      }
      for (let resurs of nizDOgadjaja[i].resursi) {
        console.log("resurs za dispetch", resurs);
        const resursODG = await dispatch(
          dodajResurs({
            token: token,
            resurs: resurs,
          })
        );
        console.log("resurs response", resursODG);
      }
    }
    onClose();
    props.onSave();
  };

  return (
    <Modal>
      <div className={`${classes.userDetailsContainer} ${classes.scrollable}`}>
        <h2>Nova konferencija</h2>
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

          {!lokacijuPrikazi && (
            <div className={classes.formRow}>
              <div className={classes.formLabelChecked}>
                <label>
                  <strong>Url</strong>
                </label>
              </div>
              <div className={classes.formChecked}>
                <input
                  checked={urlKonfChecked}
                  onChange={handleUrlCheckboxChanged}
                  type="checkbox"
                  id="url"
                  name="url"
                />
              </div>
            </div>
          )}
          {urlKonfChecked && (
            <div className={classes.formRow}>
              <div className={classes.formLabelIme}>
                <label>
                  <strong>URL:</strong>
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
          {!dogadjajIsOnline && (
            <div className={classes.formRow}>
              <div className={classes.formLabelChecked}>
                <label>
                  <strong>Lokacija:</strong>
                </label>
              </div>
              <div className={classes.formChecked}>
                <input
                  checked={lokacijaKonfChecked}
                  onChange={handleLokacijaCheckboxChanged}
                  type="checkbox"
                  id="lokacija"
                  name="lokacija"
                />
              </div>
            </div>
          )}
          {lokacijaKonfChecked && !lokacijuPrikazi && (
            <div className={classes.formRow}>
              <div className={classes.formLabelChecked}>
                <label>
                  <strong>Lokacija:</strong>
                </label>
              </div>
              <div className={classes.formInputIme}>
                <select
                  value={lokacijaKonferencije}
                  onChange={handleLokacijaChanged}
                  id="lokacija"
                  name="lokacija"
                >
                  <option value="">Odaberi lokaciju</option>
                  {lokacije.map((lokacija) => (
                    <option key={lokacija.id} value={lokacija.id}>
                      {lokacija.adresa}
                    </option>
                  ))}
                </select>
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
            <div className={classes.dogKonf}>
              <div className={classes.formRow}>
                <div className={classes.formLabelIme}>
                  <label>
                    <strong>Ime:</strong>
                  </label>
                </div>
                <div className={classes.formInputIme}>
                  <input
                    value={imeDOgadjaja}
                    onChange={handleImeDOgadjaja}
                    type="text"
                    id="imeD"
                    name="imeD"
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
                    value={startTimeDogadjaja}
                    onChange={handleStartTimeDogadjaja}
                    type="datetime-local"
                    id="startTimeD"
                    name="startTimeD"
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
                    value={endTimeDogadjaja}
                    onChange={handleEndTimeDogadjaja}
                    type="datetime-local"
                    id="endTimeD"
                    name="endTimeD"
                  />
                </div>
              </div>
              {urlKonfChecked && (
                <div className={classes.formRow}>
                  <div className={classes.formLabelIme}>
                    <label>
                      <strong>URL:</strong>
                    </label>
                  </div>
                  <div className={classes.formInputIme}>
                    <input
                      value={urlDogadjaja}
                      onChange={handleUrlDOgadjaja}
                      type="text"
                      id="urlD"
                      name="urlD"
                    />
                  </div>
                </div>
              )}

              {lokacijaKonfChecked && (
                <div className={classes.formRow}>
                  <div className={classes.formselectLabel}>
                    <label>
                      <strong>Soba:</strong>
                    </label>
                  </div>
                  <div className={classes.formSoba}>
                    <select
                      value={sobaDogadjaja}
                      onChange={handleSObaChanged}
                      id="soba"
                      name="soba"
                    >
                      <option value="">Odaberi sobu</option>
                      {selectedLocation?.sobas?.map((soba) => (
                        <option key={soba.id} value={soba.id}>
                          {soba.naziv}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className={classes.formRow}>
                <div className={classes.formselectLabel}>
                  <label>
                    <strong>Moderator:</strong>
                  </label>
                </div>
                <div className={classes.formInputIme}>
                  <select
                    value={moderatorDOgadjaja}
                    onChange={handleModeratorChanged}
                    id="moderator"
                    name="moderator"
                  >
                    <option value="">Odaberi moderatora</option>
                    {moderatori?.map((moderator) => (
                      <option key={moderator.id} value={moderator.id}>
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
                    value={tipDogadjaja}
                    onChange={handleTipDogadjajaCHnaged}
                    id="tipD"
                    name="tipD"
                  >
                    <option value="">Odaberi Tip DOgadjaja</option>
                    {tipovi_dogadjaja?.map((tip) => (
                      <option key={tip.id} value={tip.id}>
                        {tip.naziv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {lokacijaKonfChecked && (
                <div className={classes.resursiHeader}>
                  <span>Resursi </span>
                  <button
                    className={classes.plusButton}
                    onClick={hadnleResursi}
                  >
                    {showResurse ? "-" : "+"}
                  </button>
                </div>
              )}
              {showResurse && (
                <div className={classes.dogKonf}>
                  <div className={classes.formRow}>
                    <div className={classes.formLabelChecked}>
                      <label>
                        <strong>Resurs:</strong>
                      </label>
                    </div>
                    <div className={classes.formResurs}>
                      <select
                        className={classes.resursSelect}
                        value={resursDogadjaja}
                        onChange={handleResursChanged}
                        id="resurs"
                        name="resurs"
                      >
                        <option value="">Odaberi resurs</option>
                        {selectedLocation?.resurs?.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.naziv}
                            {r.id}
                          </option>
                        ))}
                      </select>
                      <select
                        className={classes.resursSelect}
                        value={kolicinaResursa}
                        onChange={handleResurskolicinaChanged}
                        id="resursKolicina"
                        name="resursKolicina"
                      >
                        <option value="">Kolicina</option>
                        {selectedLocation?.resurs?.find(
                          (r) => r.id === resursDogadjaja
                        ) &&
                          Array.from(
                            {
                              length: selectedLocation.resurs.find(
                                (r) => r.id === resursDogadjaja
                              ).kolicina,
                            },
                            (_, index) => index + 1
                          ).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                      </select>
                    </div>
                    <button
                      onClick={handleSpremiResurs}
                      className={classes.saveResurs}
                    >
                      Sačuvaj
                    </button>
                  </div>
                </div>
              )}

              <div className={classes.buttonDOgadjaji}>
                <button
                  className={classes.buttonD}
                  onClick={handleSpremiDogadjaj}
                >
                  Spremi
                </button>
                <button className={classes.buttonD} onClick={handleOdustani}>
                  Odustani
                </button>
              </div>
            </div>
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

export default AddConference;
