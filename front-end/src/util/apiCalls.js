import axios from "axios";
const yelpApiKey = process.env.REACT_APP_YELP_KEY;
const proxy = "https://teysprox.herokuapp.com";
const yelpBase = "https://api.yelp.com/v3/businesses";

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${yelpApiKey}`,
      withCredentials: true,
    },
  };
};

const getVendorsZip = async (category, zip) => {
  try {
    const { data } = await axios.get(
      `${proxy}/${yelpBase}/search?term=${category}&location=${zip}&category=${category}&radius=16093`,
      config()
    );
    return data.businesses;
  } catch (e) {
    return console.warn(e);
  }
};

const getVendorsCity = async (city, category) => {
  try {
    const { data } = await axios.get(
      `${proxy}/${yelpBase}/search?term=${category}&location=${city}&category=${category}&radius=16093`,
      config()
    );
    return data;
  } catch (e) {
    return console.warn(e);
  }
};

const getVendorsByName = async (venName, city, category) => {
  try {
    const { data } = await axios.get(
      `${proxy}/${yelpBase}/search?location=${city}&category=${category}&term=${venName},${category}`,
      config()
    );
    return data;
  } catch (e) {
    return console.warn(e);
  }
};
// const getVendorsLongLag = async (lng, lat, category) => {
//   try {
//     const { data } = await axios.get(
//       `https://cors-anywhere.herokuapp.com/${yelpBase}/search?term=${category}&longitude=${lng}&latitude=${lat}&category=${category}&radius=16093`,
//       config()
//     );
//     return data;

//   } catch (e) {
//     return console.warn(e);
//   }
// };

const getVendor = async (id) => {
  try {
    const { data } = await axios.get(`${proxy}/${yelpBase}/${id}`, config());
    return data;
  } catch (e) {
    return console.warn(e);
  }
};

const getReviews = async (id) => {
  try {
    const { data } = await axios.get(
      `${proxy}/${yelpBase}/${id}/reviews`,
      config()
    );
    return data.reviews;
  } catch (e) {
    return console.warn(e);
  }
};

const api = {
  getVendorsZip,
  getVendorsCity,
  getVendor,
  getReviews,
  getVendorsByName,
};

export default api;
