import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useGeoLocation from "../hooks/useGeoLocation";
import api from "../util/apiCalls";

function Test() {
  const [vendors, setVendors] = useState({});
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [zip, setZip] = useState("");

  const { category } = useParams();
  const location = useGeoLocation();

  useEffect(() => {
    if (location.coordinates) {
      setLat(location.coordinates.latitude);
      setLng(location.coordinates.longitude);
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      if (lng && lat) {
        const data = await api.getVendorsLongLag(lng, lat, category);
        setVendors(data);
      }
    })();
  }, [category, lng, lat]);

  const listItem = (category) => {
    let item = "";
    switch (category) {
      case "catering":
        item = "Caterers";
        break;
      case "djs":
        item = "DJ";
        break;
      case "musicians":
        item = "Musicians";
        break;
      case "party rental":
        item = "Eqipment Rentals";
        break;
      case "eventphotography":
        item = "Photographers";
        break;
      case "videographers":
        item = "Videographers";
        break;
      case "venues":
        item = "Venue";
        break;
      case "balloons":
        item = "Balloon Services";
        break;
      case "floraldesigners":
        item = "Floral Designers";
        break;
      default:
        item = "";
    }

    return item;
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (zip.length !== 5) {
      window.alert("Zip code is not valid");
    } else {
      const data = await api.getVendorsZip(category, zip);
      console.log(data);
      setVendors(data);
    }
  };

  return (
    <div>
      Search for {listItem(category)}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Event zip code"
          onChange={handleZipChange}
          value={zip}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default Test;
