import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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

    userService
      .registerUser(data)
      .then((responseData) => {
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
            Doslo je do greske prilikom registracije.Pokusajte ponovo.
          </p>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Ime</label>
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Ime"
          />
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="tvojemail@gmail.com"
            id="email"
            name="email"
          />

          <label htmlFor="text">Korisnicko ime</label>
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
          Vec imas nalog? Prijavi se ovde.
        </button>
      </div>
    </div>
  );
};

export default Signup;
