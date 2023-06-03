const getAllKonferencijeZaPosjetioca = (token, idPosjetioca) => {
  const url = `http://localhost:8080/konferencije/${idPosjetioca}/posjetilac`;

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
        throw new Error("Greška prilikom dohvata konferencija za posjetioca.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(
        "Greška prilikom dohvata konferencija za posjetioca:",
        error
      );
      throw error;
    });
};

const addOcjenu = (token, ocjenaRequest) => {
  const url = `http://localhost:8080/ocjene`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(ocjenaRequest),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom add ocjene.");
      }
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom add ocjene:", error);
      throw error;
    });
};
const addPosjetioca = (token, posjetilac) => {
  console.log("moderator iz servisa", posjetilac);
  const url = `http://localhost:8080/posjetioci`;
  console.log("url za pojetilac ", url);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(posjetilac),
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Greška prilikom add posjetioca.");
      }
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Greška prilikom add posjetioca:", error);
      throw error;
    });
};

export { getAllKonferencijeZaPosjetioca, addOcjenu, addPosjetioca };
