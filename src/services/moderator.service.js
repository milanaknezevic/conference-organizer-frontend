const getAllKonferencijeZaModeratora = (token, idModeratora) => {
  const url = `http://localhost:8080/konferencije/${idModeratora}/moderator`;
  console.log("url za moderatora", url);
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
        throw new Error("Greška prilikom dohvata konferencija za moderatora.");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(
        "Greška prilikom dohvata konferencija za moderatora:",
        error
      );
      throw error;
    });
};

const filtrirajKonferencijeModerator = (token, idModeratora, data) => {
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

  const url = `http://localhost:8080/konferencije/searchConfModerator/${idModeratora}?${params}`;
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

export { getAllKonferencijeZaModeratora, filtrirajKonferencijeModerator };
