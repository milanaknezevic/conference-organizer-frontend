import React, { useState, useEffect } from "react";
import { Person } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import classes from "./UserDetails.module.css";
import {
  azurirajKorisnika,
  promjeniLozinku,
} from "../../redux/features/userSlice";
import { Pencil } from "react-bootstrap-icons";

const UserDetails = () => {
  const user = useSelector((state) => state.login);
  const idKorisnika = user.user.id;
  const token = user.user.token;
  const [email, setEmail] = useState(user.user.email);
  const [username, setUsername] = useState(user.user.username);
  const [ime, setIme] = useState(user.user.naziv);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isImeValid, setIsImeValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [showErrorMessagePass, setShowErrorMessagePass] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (password !== "") {
      setShowErrorMessagePass(false);
    }
    console.log(" nova   event.target.value", event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    if (newPassword !== "") {
      setShowErrorMessagePass(false);
    }
    console.log(" newww event.target.value", event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    if (oldPassword !== "") {
      setShowErrorMessagePass(false);
    }
    console.log(" old    event.target.value", event.target.value);
  };
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  useEffect(() => {
    checkValidity();
  }, [ime, email, username]);

  useEffect(() => {
    checkValidityPassword();
  }, [oldPassword, newPassword, password]);

  const checkValidityPassword = () => {
    const isOldPassValid = oldPassword.trim() !== "";

    setIsOldPasswordValid(isOldPassValid);

    const isPassValid = password.trim().length > 7;
    setIsPasswordValid(isPassValid);

    const isNewPassValid = newPassword.trim().length > 7;
    setIsNewPasswordValid(isNewPassValid);

    const equality = password === newPassword;
    setPasswordMatch(equality);

    if (
      isOldPasswordValid &&
      isPasswordValid &&
      isNewPasswordValid &&
      passwordMatch
    ) {
      setShowErrorMessagePass(false);
    } else {
    }
  };
  const handleSubmitPass = () => {
    checkValidityPassword();

    if (
      isOldPasswordValid &&
      isPasswordValid &&
      isNewPasswordValid &&
      passwordMatch
    ) {
      setShowErrorMessagePass(false);

      const data = {
        password: newPassword,
        trenutnaLozinka: oldPassword,
      };

      dispatch(promjeniLozinku({ token, data, idKorisnika }))
        .then((response) => {})
        .catch((error) => {});
      setIsChangeMode(false);
      setPassword("");
      setNewPassword("");
      setOldPassword("");
    } else {
      setShowErrorMessagePass(true);

      setIsPasswordValid(false);
      setIsNewPasswordValid(false);
      setIsOldPasswordValid(false);
    }
  };
  const handleChangeClick = () => {
    setIsChangeMode(true);
  };
  const handleChangeDiscardClick = () => {
    setOldPassword("");
    setNewPassword("");
    setPassword("");
    setIsChangeMode(false);
    setShowErrorMessage(false);
    setShowErrorMessagePass(false);
  };
  const handleSaveClick = () => {
    checkValidity();

    if (isImeValid && isEmailValid && isUsernameValid) {
      const data = {
        korisnickoIme: username,
        ime: ime,
        email: email,
      };

      dispatch(
        azurirajKorisnika({
          token: token,
          data: data,
          idKorisnika: idKorisnika,
        })
      )
        .then((response) => {})
        .catch((error) => {});

      setIsEditMode(false);
    } else {
      setShowErrorMessage(true);
      setIsEmailValid(false);
      setIsImeValid(false);
      setIsUsernameValid(false);
    }
  };

  const handleDiscardClick = () => {
    setEmail(user.user.email);
    setIme(user.user.naziv);
    setUsername(user.user.username);
    setIsEditMode(false);
    setShowErrorMessage(false);
    setShowErrorMessagePass(false);
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
          {showErrorMessagePass && (
            <p className={classes.errorMessage}>Provjerite unesene lozinke!</p>
          )}
          {isEditMode && !isChangeMode && (
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
          )}
          {!isEditMode && !isChangeMode && (
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

          {!isEditMode && isChangeMode && (
            <div>
              <div className="form-row">
                <div className="form-label">
                  <label>
                    <strong>Trenutna lozinka:</strong>
                  </label>
                </div>
                <div className="form-input">
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    id="old_password"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-label">
                  <label>
                    <strong>Nova Lozinka:</strong>
                  </label>
                </div>
                <div className="form-input">
                  <input
                    name="new_password"
                    type="password"
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-label">
                  <label>
                    <strong>Ponovi lozinku: </strong>
                  </label>
                </div>
                <div className="form-input">
                  <input
                    name="repeated_password"
                    type="password"
                    onChange={handleNewPasswordChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {isEditMode && !isChangeMode && (
          <div className={classes.editButtons}>
            <button className={classes.sacuvaj} onClick={handleSaveClick}>
              Sačuvaj
            </button>
            <button className={classes.ponisti} onClick={handleDiscardClick}>
              Poništi
            </button>
          </div>
        )}
        {!isEditMode && isChangeMode && (
          <div className={classes.editButtons}>
            <button className={classes.sacuvaj} onClick={handleSubmitPass}>
              Sačuvaj
            </button>
            <button
              className={classes.ponisti}
              onClick={handleChangeDiscardClick}
            >
              Poništi
            </button>
          </div>
        )}
      </div>
      {!isEditMode && !isChangeMode && (
        <div className={classes.editButton}>
          <button onClick={handleEditClick}>
            <Pencil />
            Uredi
          </button>
        </div>
      )}
      {!isEditMode && !isChangeMode && (
        <button className={classes.linkBtn} onClick={handleChangeClick}>
          Promjeni lozinku.
        </button>
      )}
    </div>
  );
};

export default UserDetails;
