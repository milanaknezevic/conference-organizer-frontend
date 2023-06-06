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

const filtrirajKonferencijePosjetilac = (token, idPosjetioca, data) => {
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

  const url = `http://localhost:8080/konferencije/searchConfPosjetilac/${idPosjetioca}?${params}`;
  console.log("url iz servisa", url);

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

export {
  getAllKonferencijeZaPosjetioca,
  addOcjenu,
  addPosjetioca,
  filtrirajKonferencijePosjetilac,
};
