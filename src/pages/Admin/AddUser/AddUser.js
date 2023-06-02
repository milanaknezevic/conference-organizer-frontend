import Modal from "../../Modal/Modal";
import classes from "./AddUser.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddUser = (props) => {
  const { onClose } = props;

  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    console.log("kreiranje korisnika");
  }, []);
  const handleSpremi = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "" && name !== "" && email !== "") {
      const korisnik = {
        username: username,
        password: password,
        naziv: name,
        email: email,
        rola: 2, //moderator???
      };

      console.log("korisnik", korisnik);
    } else {
      setError(true);
      setErrorMessage("Popunite sva polja!");
    }

    /* dispatch(registrujSe(data))
     .then((response) => {
       console.log("Login response", response);
       setRegistrationSuccess(true);
     })
     .catch((error) => {
       console.error("Došlo je do greške prilikom slanja zahtjeva:", error);
       setError(true);
       setPassword("");
       setUsername("");
       setName("");
       setEmail("");
     });*/
  };
  const handleOdustani = () => {
    console.log("token", token);

    onClose(); // Zatvorite modal nakon brisanja konferencije
  };

  return (
    <Modal>
      <div className={classes.userDetailsContainer}>
        <div>
          <div>
            <div className={classes.naslov}>
              <h2>Novi korisnik</h2>
            </div>
            {error && <p className={classes.errorMessage}>{errorMessage}</p>}

            <form className="register-form" onSubmit={handleSpremi}>
              <label htmlFor="name">Ime</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(false);
                }}
                type="text"
                placeholder="Ime"
                id="name"
                name="name"
              />

              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                type="email"
                placeholder="tvojemail@gmail.com"
                id="email"
                name="email"
              />

              <label htmlFor="username">Korisničko ime</label>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(false);
                }}
                type="text"
                placeholder="Korisničko ime"
                id="username"
                name="username"
              />

              <label htmlFor="password">Lozinka</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                type="password"
                placeholder="********"
                id="password"
                name="password"
              />

              <div className={classes.buttonDOgadjaji}>
                <button className={classes.buttonD}>Spremi</button>
                <button onClick={handleOdustani} className={classes.buttonD}>
                  Odustani
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddUser;
