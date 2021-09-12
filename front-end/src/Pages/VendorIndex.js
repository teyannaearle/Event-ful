import React, { useEffect, useState } from "react";
import Ratings from "react-ratings-declarative";
import { useParams } from "react-router";
import api from "../util/apiCalls";
import VendorList from "../Components/VendorList";
import ZipSearch from "../Components/ZipSearch"

export default function VendorIndex({ location }) {
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
      case "photographers":
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
      case "floral":
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
          <li key={vendor.id} className="flex-col three-d ven-li">
            <img
              src={vendor.image_url}
              alt={vendor.name}
              height="200"
              width="200" 
            />
            <h1>{vendor.name}</h1>
            {/* Display distance */}
            <p>Phone: {vendor.display_phone}</p>
            <div className="flex-row">
              <p>
                Avg Rating:{" "}              </p>
                <Ratings
                  rating={vendor.rating}
                  widgetRatedColors="steelblue"
                  widgetSpacings="2px"
                >
                  <Ratings.Widget widgetDimension="15px" />
                  <Ratings.Widget widgetDimension="15px" />
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="15px" />
                  <Ratings.Widget widgetDimension="15px" />
                </Ratings>
 
            </div>
          </li>
        );
      });
      return <ul className="ven-ul"> {ven} </ul>;
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
    <div className="page indexpg-container">
      <div>
        {category ? <h1 className="flex-row"> {listItem(category)} </h1> : null}
        <form onSubmit={handleSubmit} id="zip-form">
          <input
            className="three-d"
            type="number"
            placeholder="Event zip code"
            onChange={handleZipChange}
            value={zip}
            id="zip-search"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {vendorsDisplay()}
      {/* {location.coordinates ? <VendorList vendors={vendors} /> :   <ZipSearch category={listItem(category)} />} */}

    </div>
  );
}
