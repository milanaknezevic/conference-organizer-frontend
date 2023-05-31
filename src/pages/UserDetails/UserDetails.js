import React, { useState, useEffect } from "react";
import { Person } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import classes from "./UserDetails.module.css";
import { azurirajKorisnika } from "../../redux/features/userSlice";
const UserDetails = () => {
  const user = useSelector((state) => state.login);
  const [email, setEmail] = useState(user.user.email);
  const [username, setUsername] = useState(user.user.username);
  const [ime, setIme] = useState(user.user.naziv);
  const [isEmailValid, setIsEmailValid] = useState(true); // Dodano stanje za praćenje ispravnosti e-maila
  const [isEditMode, setIsEditMode] = useState(false);
  const [isImeValid, setIsImeValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  useEffect(() => {
    checkValidity(); // Provjerava valjanost svih parametara
  }, [ime, email, username]);

  const handleSaveClick = () => {
    checkValidity(); // Provjerava valjanost svih parametara

    if (isImeValid && isEmailValid && isUsernameValid) {
      const data = {
        korisnickoIme: username,
        ime: ime,
        email: email,
      };
      const idKorisnika = user.user.id;
      const token = user.user.token;
      console.log("Podaci validni!"); // Možete zamijeniti s prikladnom porukom za prikaz na korisničkom sučelju

      dispatch(
        azurirajKorisnika({
          token: token,
          data: data,
          idKorisnika: idKorisnika,
        })
      )
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {});

      setIsEditMode(false);
    } else {
      setShowErrorMessage(true); // Postavlja stanje za prikaz poruke na true
      setIsEmailValid(false); // Postavlja stanje ispravnosti e-maila na false
      setIsImeValid(false); // Postavlja stanje ispravnosti imena na false
      setIsUsernameValid(false); // Postavlja stanje ispravnosti korisničkog imena na false
    }
  };

  const handleDiscardClick = () => {
    setEmail(user.user.email);
    setIme(user.user.naziv);
    setUsername(user.user.username);
    setIsEditMode(false);
  };

  const validateEmail = (email) => {
    const isEmailValid1 = email.trim() !== "";
    setIsEmailValid(isEmailValid1);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkValidity = () => {
    const isImeValid1 = ime.trim() !== "";
    setIsImeValid(isImeValid1);

    const isValid = validateEmail(email);
    setIsEmailValid(isValid);

    const isUsernameValid1 = username.trim() !== "";
    setIsUsernameValid(isUsernameValid1);

    if (isImeValid1 && isValid && isUsernameValid1) {
      setShowErrorMessage(false);
    } else {
    }
  };

  return (
    <div className={classes.userDetailsContainer}>
      <div className={classes.userDetails}>
        <div className={classes.userIcon}>
          <Person size={48} />
        </div>
        <div className={classes.userInfo}>
          <h2>Podaci o korisniku:</h2>
          {showErrorMessage && (
            <p className={classes.errorMessage}>Provjerite unesene podatke!</p>
          )}
          {isEditMode ? (
            <div>
              <div className={classes.formRow}>
                <div className={classes.formLabel}>
                  <label>
                    <strong>Ime:</strong>
                  </label>
                </div>
                <div className={classes.formInput}>
                  <input
                    value={ime}
                    onChange={(e) => {
                      setIme(e.target.value);
                    }}
                    type="text"
                    placeholder={user.user.naziv}
                    id="ime"
                    name="ime"
                  />
                </div>
              </div>

              <div className={classes.formRow}>
                <div className={classes.formLabel}>
                  <label>
                    <strong>E-mail: </strong>
                  </label>
                </div>
                <div className={classes.formInput}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder={user.user.email}
                    id="email"
                    name="email"
                    pattern=".+@.+\..+"
                    required
                  />
                </div>
              </div>

              <div className={classes.formRow}>
                <div className={classes.formLabel}>
                  <label>
                    <strong>Korisničko ime: </strong>
                  </label>
                </div>
                <div className={classes.formInput}>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder={user.user.username}
                    id="username"
                    name="username"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>
                <strong>Ime:</strong> {ime}
              </p>

              <p>
                <strong>E-mail:</strong> {email}
              </p>
              <p>
                <strong>Korisničko ime:</strong> {username}
              </p>
            </div>
          )}
        </div>

        {isEditMode && (
          <div className={classes.editButtons}>
            <button onClick={handleSaveClick}>Sačuvaj</button>
            <button onClick={handleDiscardClick}>Poništi</button>
          </div>
        )}
      </div>
      {!isEditMode && (
        <div className={classes.editButton}>
          <button onClick={handleEditClick}>Uredi</button>
        </div>
      )}
      {!isEditMode && (
        <button className={classes.linkBtn}>Promjeni lozinku.</button>
      )}
    </div>
  );
};

export default UserDetails;
