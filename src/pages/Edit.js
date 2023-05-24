import Modal from "./Modal";
import { useState, useEffect } from "react";
import { promjeniStatus } from "../services/admin.services";

const Edit = (props) => {
  const { user, onClose, token } = props;
  const [checkedValues, setCheckedValues] = useState({
    value1: false,
    value2: false,
  });

  const [status, setStatus] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked,
      [name === "value1" ? "value2" : "value1"]: false,
    }));

    setStatus(checked ? (name === "value1" ? "ACTIVE" : "BLOCKED") : "");
  };

  const handleSave = () => {
    const userId = user.id;
    const saveToken = token;
    console.log("userId", userId);
    console.log("token", saveToken);
    console.log("status", status);

    promjeniStatus(saveToken, userId, status)
      .then((response) => {
        console.log("Status je uspješno izmijenjen:", response);
        onClose();
      })
      .catch((error) => {
        console.error("Greška prilikom izmjene statusa:", error);
      });

    props.onStatusChange();
  };

  useEffect(() => {
    console.log("user", user);
    console.log("status", user.status);
    console.log("Active", checkedValues.value1);
    console.log("blocked", checkedValues.value2);
  }, [checkedValues, user]);

  return (
    <Modal>
      <div className="act">
        <p>Promjeni status od {user.username}:</p>
        {user.status !== "ACTIVE" && (
          <label>
            <input
              type="checkbox"
              name="value1"
              checked={checkedValues.value1}
              onChange={handleCheckboxChange}
            />
            ACTIVE
          </label>
        )}
        {user.status !== "BLOCKED" && (
          <label>
            <input
              type="checkbox"
              name="value2"
              checked={checkedValues.value2}
              onChange={handleCheckboxChange}
            />
            BLOCKED
          </label>
        )}

        <div className="button-container">
          <button onClick={handleSave}>Sacuvaj</button>
          <button onClick={onClose}>Zatvori</button>
        </div>
      </div>
    </Modal>
  );
};

export default Edit;
