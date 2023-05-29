const getAllKonferencije = (token) => {
  const url = `http://localhost:8080/konferencije/all`;

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
        throw new Error("Greška prilikom dohvata konferencija.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata konferencija:", error);
      throw error;
    });
};

const deleteKonferenciju = (token, idKonferencije) => {
  const url = `http://localhost:8080/konferencije/${idKonferencije}`;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom brisanja konferencija.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom brisanja konferencija:", error);
      throw error;
    });
};

const getModeratore = (token) => {
  const url = `http://localhost:8080/korisnici/moderatori`;

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
        throw new Error("Greška prilikom dohvata moderatora.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata moderatora:", error);
      throw error;
    });
};

const getLokacije = (token) => {
  const url = `http://localhost:8080/lokacije`;

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
        throw new Error("Greška prilikom dohvata lokacija.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata lokacija:", error);
      throw error;
    });
};

const getTipoviDogadjaja = (token) => {
  const url = `http://localhost:8080/tipovi_dogadjaja`;

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
        throw new Error("Greška prilikom dohvata tipova dogadjaja.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvata tipova dogadjaja:", error);
      throw error;
    });
};

const updateKonferenciju = (token, idKonferencije, konferencijaRequest) => {
  const url = `http://localhost:8080/konferencije/${idKonferencije}`;

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(konferencijaRequest),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom update konferencije.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom update konferencije:", error);
      throw error;
    });
};

export {
  getAllKonferencije,
  deleteKonferenciju,
  getModeratore,
  getLokacije,
  getTipoviDogadjaja,
  updateKonferenciju,
};
