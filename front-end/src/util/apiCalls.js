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
  const { data } = await axios.get(
    `${proxy}/${yelpBase}/search?term=${category}&location=${zip}&category=${category}&radius=16093`,
    config()
  );

  return data.businesses;
};

const getVendorsLongLag = async (lng, lat, category) => {
  const { data } = await axios.get( `${proxy}/${yelpBase}/search?term=${category}&longitude=${lng}&latitude=${lat}&category=${category}&radius=16093`,
  config()
  )
  return data
}

const getVendor = async (id) => {
  const { data } = await axios.get(`${proxy}/${yelpBase}/${id}`, config());
  return data;
};

const getReviews = async (id) => {
  const { data } = await axios.get(
    `${proxy}/${yelpBase}/${id}/reviews`,
    config()
  );
  return data.reviews;
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
