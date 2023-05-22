const getAll = (token, userId) => {
  const url = `http://localhost:8080/korisnici/bezAdmina/${userId}`;

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
        throw new Error("Greška prilikom dohvata korisnika.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata korisnika:", error);
      throw error;
    });
};

const getAktivni = (token, userId) => {
  const url = `http://localhost:8080/korisnici/aktivni`;

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
        throw new Error("Greška prilikom dohvata korisnika.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata korisnika:", error);
      throw error;
    });
};
const getZahtjevi = (token, userId) => {
  const url = `http://localhost:8080/korisnici/zahtjevi`;

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
        throw new Error("Greška prilikom dohvata korisnika.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata korisnika:", error);
      throw error;
    });
};

const getBlokirani = (token, userId) => {
  const url = `http://localhost:8080/korisnici/blokirani`;

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
        throw new Error("Greška prilikom dohvata korisnika.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata korisnika:", error);
      throw error;
    });
};

const promjeniStatus = (token, userId, status) => {
  const url = `http://localhost:8080/korisnici/${userId}/status`;
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      status: status,
    }),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom izmjene statusa.");
      }
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom izmjene statusa:", error);
      throw error;
    });
};

export { getAll, promjeniStatus, getAktivni, getZahtjevi, getBlokirani };
