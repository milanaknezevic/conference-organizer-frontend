const login = (data) => {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((responseJson) => {
      // Spremanje uloge korisnika u localStorage
      localStorage.setItem("userRole", responseJson.role);
      localStorage.setItem("auth", responseJson.token);
      // sessionStorage.setItem("auth", responseJson.token);
      return responseJson;
    })
    .catch((error) => {
      console.error("Došlo je do greške prilikom slanja zahtjeva:", error);
      throw error;
    });
};

const registerUser = (data) => {
  return fetch("http://localhost:8080/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("New user registered");
        return response.ok;
      } else {
        console.error("Registration failed");
        throw new Error("Došlo je do greške prilikom slanja zahtjeva");
      }
    })
    .catch((error) => {
      console.error("Došlo je do greške prilikom slanja zahtjeva:", error);
      throw error;
    });
};

const odjaviKorisnika = () => {
  //sessionStorage.removeItem("auth");
  localStorage.removeItem("auth");
};
const updateKorisnika = (token, data, idKorisnika) => {
  const url = `http://localhost:8080/korisnici/${idKorisnika}`;
  console.log("idKorisnika", idKorisnika);
  console.log("token", token);
  console.log("data", data);
  console.log("url", url);
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom update korisnika.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom update korisnika:", error);
      throw error;
    });
};
const userService = {
  login,
  registerUser,
  odjaviKorisnika,
  updateKorisnika,
};

export default userService;
