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
      localStorage.setItem("userRole", responseJson.rola);
      localStorage.setItem("auth", responseJson.token);

      return responseJson;
    })
    .catch((error) => {
      console.error("Došlo je do greške prilikom slanja zahtjeva:", error);
      throw error;
    });
};
const filtrirajKonferencije = (token, data) => {
  const { status, start, end, naziv } = data; // Dohvaćanje parametara iz objekta data
  const params = new URLSearchParams();
  if (status != null) {
    params.append("status", status);
  }
  if (start !== undefined && start !== null) {
    params.append("start", start);
  }

  if (end !== undefined && end !== null) {
    params.append("end", end);
  }

  if (naziv !== undefined && naziv !== null && naziv !== "") {
    params.append("naziv", naziv);
  }

  const url = `http://localhost:8080/konferencije/searchConf?${params}`;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom dohvata konferencija za filter.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata konferencija za filter:", error);
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
const changePassword = (token, data, idKorisnika) => {
  const url = `http://localhost:8080/korisnici/${idKorisnika}/change-password`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom promjene passworda.");
      }
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom promjene  passworda:", error);
      throw error;
    });
};
const userService = {
  login,
  registerUser,
  odjaviKorisnika,
  updateKorisnika,
  changePassword,
  filtrirajKonferencije,
};

export default userService;
