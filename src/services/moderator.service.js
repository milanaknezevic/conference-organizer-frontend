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
export { getAllKonferencijeZaModeratora };
