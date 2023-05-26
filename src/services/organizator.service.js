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

export { getAllKonferencije, deleteKonferenciju };
