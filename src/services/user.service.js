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
      // Spremanje uloge korisnika u localStorage
      localStorage.setItem("userRole", responseJson.role);
      localStorage.setItem("auth", responseJson.token);
      // sessionStorage.setItem("auth", responseJson.token);
      return responseJson;
    })
    .catch((error) => {
      console.error("Došlo je do greške prilikom slanja zahtjeva:", error);
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
        console.log("New user registered");
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

const userService = {
  login,
  registerUser,
  odjaviKorisnika,
};

export default userService;
