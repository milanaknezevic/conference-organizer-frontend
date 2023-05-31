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
  console.log("servis konferencijaRequest", konferencijaRequest);
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

const updateRezervacije = (token, nizResursa) => {
  const url = `http://localhost:8080/rezervacije/rezervacija_update`;

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(nizResursa),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom update rezervacija.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom update rezervacija:", error);
      throw error;
    });
};

const addKonferencija = (token, konferencijaRequest) => {
  const url = `http://localhost:8080/konferencije`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(konferencijaRequest),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom add konf.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom add konf:", error);
      throw error;
    });
};

const addDogadjaj = (token, dogadjaj) => {
  const url = `http://localhost:8080/dogadjaji`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(dogadjaj),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom add dogadjaja.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom add dogadjaja:", error);
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
  updateRezervacije,
  addKonferencija,
  addDogadjaj,
};
