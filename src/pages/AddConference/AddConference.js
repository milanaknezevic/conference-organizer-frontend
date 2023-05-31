import {
  setTipoviDogadjaja,
  dodajKonferenciju,
  dodajDogadjaj,
} from "../../redux/features/organizatorSlice";
import Modal from "../Modal/Modal";
import classes from "./AddConference.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddConference = (props) => {
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [nizDOgadjaja, setNizDOgadjaja] = useState([]);
  const [dogadjajIsOnline, setDogadjajIsOnline] = useState(false);
  const [lokacijuPrikazi, setLokacijuPrikazi] = useState(false);

  const { onClose } = props;
  const [imeKonferencije, setImeKonferencije] = useState("");
  const [startTimeKonferencije, setStartTimeKonferencije] = useState("");
  const [endTimeKonferencija, setEndTimeKonferencija] = useState("");
  const [urlKonferencije, setUrlKonferencije] = useState("");
  const [urlKonfChecked, setUrlKonfChecked] = useState(false);
  const [lokacijaKonferencije, setLokacijaKonferencije] = useState("");
  const [lokacijaKonfChecked, setLokacijaKonfChecked] = useState(false);
  const [showDogadjaje, setShowDogadjaje] = useState(false);
  const [showErrorMess, setShowErrorMess] = useState(false);
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
  const [moderatorDOgadjaja, setModeratorDOgadjaja] = useState("");
  const [tipDogadjaja, tsetTipDogadjaja] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("selected:", selectedLocation);
    console.log("soba:", selectedLocation?.sobas);
    console.log("Moderatori", moderatori);
    console.log("Tipovi dogadjaj", tipovi_dogadjaja);
  }, [lokacije, moderatori, tipovi_dogadjaja, lokacijaKonferencije]);
  const handleDogadjaji = (e) => {
    e.preventDefault();
    if (lokacijaKonfChecked || urlKonfChecked) {
      if (lokacijaKonferencije === "" && urlKonferencije === "") {
        setShowErrorMess(true);
        setShowDogadjaje(false);
      } else {
        setShowErrorMess(false);
        setShowDogadjaje(!showDogadjaje);
        console.log("showDogadjaje", showDogadjaje);
      }
    } else {
      setShowErrorMess(true);
      if (showDogadjaje) {
        setShowDogadjaje(false);
      }
    }
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

    setUrlKonferencije("");
  };
  const handleSObaChanged = (e) => {
    console.log("soba izabrana", e.target.value);
    //pamti id sobe sto je idealno tnx god
    const selectedSoba2 = parseInt(e.target.value, 10);
    setSobaDogadjaja(selectedSoba2);
  };

  const handleModeratorChanged = (e) => {
    console.log("moderator izabrana", e.target.value);
    const moder2 = parseInt(e.target.value, 10);
    setModeratorDOgadjaja(moder2);
  };
  const handleTipDogadjajaCHnaged = (e) => {
    console.log("tip izabrana", e.target.value);
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
      console.log("ne moze");
    } else {
      console.log("spremi dogadjaj");
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
      };
      if (urlDogadjaja === "") {
        setDogadjajIsOnline(false);
        setLokacijuPrikazi(true);
      } else {
        setDogadjajIsOnline(true);
        setLokacijuPrikazi(false);
      }
      console.log("noviDogadjaj", noviDogadjaj);
      setNizDOgadjaja((prevNiz) => [...prevNiz, noviDogadjaj]);

      console.log("dogadjaji", nizDOgadjaja);

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
    console.log("novi dogadjaji", nizDOgadjaja);

    console.log("nova konferencija", konferencijaRequest);
    const conf = await dispatch(
      dodajKonferenciju({
        token: token,
        konferencijaRequest: konferencijaRequest,
      })
    );
    console.log("to je moj id", nizDOgadjaja);
    for (let dogadjaj of nizDOgadjaja) {
      dogadjaj.konferencijaId = conf.payload.id;
    }
    console.log("nizDOgadjaja", nizDOgadjaja);
    for (let dogadjaj of nizDOgadjaja) {
      dispatch(
        dodajDogadjaj({
          token: token,
          dogadjaj: dogadjaj,
        })
      );
    }
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
