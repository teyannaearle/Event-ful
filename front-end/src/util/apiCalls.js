import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const proxy = "https://morning-spire-06380.herokuapp.com";
const yelpBase = "https://api.yelp.com/v3/businesses";

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      withCredentials: true,
    },
  };
};

const getVendorsZip = async (category, zip) => {
  try {
    const { data } = await axios.get(
      `${yelpBase}/search?term=${category}&location=${zip}&category=${category}&radius=16093`,
      config()
    );
    return data.businesses;
  } catch (e) {
    return console.warn(e);
  }
};

const getVendorsLongLag = async (lng, lat, category) => {
  try {
    const { data } = await axios.get(
      `${yelpBase}/search?term=${category}&longitude=${lng}&latitude=${lat}&category=${category}&radius=16093`,
      config()
    );
    return data;
  } catch (e) {
    return console.warn(e);
  }
};

const getVendor = async (id) => {
  try {
    const { data } = await axios.get(`${yelpBase}/${id}`, config());
    return data;
  } catch (e) {
    return console.warn(e);
  }
};

const getReviews = async (id) => {
  try {
    const { data } = await axios.get(
      `${yelpBase}/${id}/reviews`,
      config()
    );
    return data.reviews;
  } catch (e) {
    return console.warn(e);
  }
};

const api = {
  getVendorsZip,
  getVendorsLongLag,
  getVendor,
  getReviews,
};

export default api;

// export const apiURL = () => {
//   return window.location.hostname === "localhost"
//     ? "http://localhost:3333"
//     : "https://mysterious-spire-49483.herokuapp.com";
// };
