import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ulogujSe } from "../../redux/features/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username !== "" && password !== "") {
      const data = {
        username: username,
        password: password,
      };

      dispatch(ulogujSe(data))
        .then((response) => {
          if (response.payload.rola === "ADMIN") {
            navigate("/admin");
          } else if (
            response.payload.rola === "ORGANIZATOR" &&
            response.payload.status === "ACTIVE"
          ) {
            navigate("/organizator");
          } else if (
            response.payload.rola === "POSJETILAC" &&
            response.payload.status === "ACTIVE"
          ) {
            navigate("/posjetilac");
          } else if (
            response.payload.rola === "MODERATOR" &&
            response.payload.status === "ACTIVE"
          ) {
            navigate("/moderator");
          } else {
            setError(false);
            setErrorMessage("");
          }
        })
        .catch((error) => {
          setError(true);
          setErrorMessage("Korisničko ime ili lozinka nisu ispravni.");
          setPassword("");
          setUsername("");
        });
    } else {
      setError(true);
      setErrorMessage("Unesite korisničko ime i lozinku.");
    }
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>Prijavi se</h2>
        {error && <p className="error-message">{errorMessage}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Korisničko ime</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(false);
              setErrorMessage("");
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
              setErrorMessage("");
            }}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit">Prijavi se</button>
        </form>
        <button className="link-btn" onClick={handleSignup}>
          Nemaš nalog? Registruj se ovde.
        </button>
      </div>
    </div>
  );
};

export default Login;
