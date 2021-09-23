import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../util/apiCalls";
import VendorList from "../Components/VendorIndex/VendorList"
import Loading from "../Components/Loading"
import CategorySwitch from "../Components/CategorySwitch"

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
    return () => {
      setVendors([]);
      setSearched(false)
    }
  }, [category, lng, lat]);

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await api.getVendorsZip(category, zip);
    setVendors(data);
    setSearched(true)
    // if (zip.length !== 5) {
    //   window.alert("Zip code is not valid");
    // } else {
    //   const data = await api.getVendorsZip(category, zip);
    //   setVendors(data);
    //   setSearched(true)
    // }
  };

 
  const vendorsList = () => {
    let result = ""
    if (!location.coordinates && !searched){
      result =     <>  <h2>
      Input zip code above to search for {CategorySwitch(category)} in your area.
    </h2>
    <Loading /> </>

    } else if (searched && !vendors[0]){
      result = <h2>Unfortunately, we could not find any vendors in this area. Please try another zip code. </h2>
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
      {category ? <h1 className="flex-row pg-head"> {CategorySwitch(category)} </h1> : null}
      <form onSubmit={handleSubmit} id="zip-form">
        <input
          className="three-d pg-input"
          type="text"
          placeholder="Zip Code - Must be 5 digits -"
          onChange={handleZipChange}
          value={zip}
          id="zip-search"
          required 
          pattern="[0-9]{5}"
        />
        <button type="submit" className="pg-buttons">Search</button>
      </form>
    </div>
    {vendorsList()}
  </div>

  )
}
