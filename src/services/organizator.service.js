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
  console.log("idKonferencije u fetchu", idKonferencije);
  const url = `http://localhost:8080/konferencije/${idKonferencije}`;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  console.log("urlllllllllllllllllllllll", url);
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
      console.log("response lokacije iz servisa", response.json);
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

export { getAllKonferencije, deleteKonferenciju, getModeratore, getLokacije };
