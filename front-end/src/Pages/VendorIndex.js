import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../util/apiCalls";

export default function VendorIndex({location}) {
  const [vendors, setVendors] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const { category } = useParams();
  const [zip, setZip] = useState("");

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
        setVendors(data.businesses);
      }
    })();
  }, [category, lng, lat]);

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (zip.length !== 5) {
      window.alert("Zip code is not valid");
    } else {
      const data = await api.getVendorsZip(category, zip);
      setVendors(data);
    }
  };

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

  const vendorsDisplay = () => {
    if (location.coordinates) {
      let ven = vendors.map((vendor) => {
        return (
          <li key={vendor.id}>
            <img src={vendor.image_url} alt={vendor.name} height="200" />
            <h1>{vendor.name}</h1>
            {/* Display distance */}
            <p>Phone: {vendor.display_phone}</p>
            <p>Avg Rating: {vendor.rating}</p>
          </li>
        );
      });
      return <div> {ven} </div>;
    } else {
      return (
        <div>
          <h1>
            Input zip code above to search for {listItem(category)} in your
            area.
          </h1>
        </div>
      );
    }
  };

  return (
    <div className="page">
      <div>
        {category ? <h1> {listItem(category)} </h1> : null}

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Event zip code"
            onChange={handleZipChange}
            value={zip}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {vendorsDisplay()}
    </div>
  );
}
