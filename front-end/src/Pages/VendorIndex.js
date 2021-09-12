import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../util/apiCalls";
import VendorList from "../Components/VendorList";
import ZipSearch from "../Components/ZipSearch"
import Loading from "../Components/Loading"
import NoVendors from "../Components/NoVendors";

export default function VendorIndex({ location }) {
  const [vendors, setVendors] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [zip, setZip] = useState("");
  const [searched, setSearched] = useState(false)
  const { category } = useParams();

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
        setSearched(true)
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
      setSearched(true)
    }
  };

  const listItem = (category) => {
    let item = "";
    switch (category) {
      case "catering":
        item = "Caterers";
        break;
      case "djs":
        item = "Djs";
        break;
      case "musicians":
        item = "Musicians";
        break;
      case "party rental":
        item = "Equipment Rentals";
        break;
      case "photographers":
        item = "Photographers";
        break;
      case "videographers":
        item = "Videographers";
        break;
      case "venues":
        item = "Venues";
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


  const vendorsList = () => {
    let result = ""
    if (!location.coordinates){
      result = <ZipSearch category={listItem(category)} />
    } else if (searched && !vendors[0]){
      result = <NoVendors />
    } else if (location.coordinates && !vendors[0]){
      result = <Loading />
    } else {
      result = <VendorList vendors={vendors} category={category} />
    }
    return result
  }

  return(
    <div className="page indexpg-container">
    <div>
      {category ? <h1 className="flex-row pg-head"> {listItem(category)} </h1> : null}
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
    {vendorsList()}
  </div>
  )
}
