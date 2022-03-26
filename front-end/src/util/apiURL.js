export const apiURL = () => {
    return window.location.hostname === "localhost"
      ? "http://localhost:3333"
      : "https://eventful-application-db.herokuapp.com";
  };
  