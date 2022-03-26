export const apiURL = () => {
    return window.location.hostname === "localhost"
    ? "https://eventful-application-db.herokuapp.com"
      // ? "http://localhost:3333"
      : "https://eventful-application-db.herokuapp.com";
  };
  