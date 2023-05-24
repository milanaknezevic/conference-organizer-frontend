import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registrujSe } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      naziv: name,
      email: email,
      rola: 3,
    };

    console.log(data);

    dispatch(registrujSe(data))
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
      });
  };

  useEffect(() => {
    if (registrationSuccess) {
      alert("Registracija je uspješna.");
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000); // Preusmjeravanje nakon 1 sekunde

      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="App">
      <div className="auth-form-container">
        <h2>Registruj se</h2>
        {error && (
          <p className="error-message">
            Došlo je do greške prilikom registracije. Pokušajte ponovo.
          </p>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Ime</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Ime"
            id="name"
            name="name"
          />

          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="tvojemail@gmail.com"
            id="email"
            name="email"
          />

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

          <button>Registruj se</button>
        </form>

        <button className="link-btn" onClick={handleLogin}>
          Već imaš nalog? Prijavi se ovde.
        </button>
      </div>
    </div>
  );
};

export default Signup;
