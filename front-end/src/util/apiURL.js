export const apiURL = () => {
    return window.location.hostname === "localhost"
      ? "http://localhost:3333"
      : "https://eventful-capstone.herokuapp.com";
  };
  