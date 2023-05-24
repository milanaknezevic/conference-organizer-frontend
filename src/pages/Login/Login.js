import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ulogujSe } from "../../redux/features/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    dispatch(ulogujSe(data))
      .then((response) => {
        console.log("Login response", response);
        console.log("Login payload", response.payload);
        console.log("Login username", response.payload.username);
        console.log("Login ulogovan", response.payload.ulogovan);

        if (response.payload.rola === "ADMIN") {
          navigate("/admin");
        } else if (
          response.payload.rola === "ORGANIZATOR" &&
          response.payload.status === "ACTIVE"
        ) {
          console.log("organizatro je aktivan");
          navigate("/organizator");
        } else {
          setError(false);
        }
      })
      .catch((error) => {
        setError(true);
        setPassword("");
        setUsername("");
      });
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>Prijavi se</h2>
        {error && (
          <p className="error-message">
            Korisničko ime ili lozinka nisu ispravni.
          </p>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Korisničko ime</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Korisničko ime"
            id="username"
            name="username"
          />
          <label htmlFor="password">Lozinka</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
