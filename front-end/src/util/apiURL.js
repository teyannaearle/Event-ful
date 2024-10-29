export const apiURL = () => {
    return window.location.hostname === "localhost"
    ?"http://localhost:3003"
      : "https://eventful-db-03151a93f7aa.herokuapp.com/"
  };
  
