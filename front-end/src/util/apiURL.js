export const apiURL = () => {
    return window.location.hostname === "localhost"
    ?"http://localhost:3003"
      : "https://eventful-application.herokuapp.com"
      // "https://eventful.adaptable.app";
  };
  