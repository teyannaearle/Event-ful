import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../util/apiCalls";
import VendorList from "../Components/VendorIndex/VendorList";
import Loading from "../Components/Loading";
import CategorySwitch from "../Components/CategorySwitch";
import NavBar from "../Components/NavBar/NavBar";


export default function VendorIndex({ city }) {
  const [vendors, setVendors] = useState([]);
  const [zip, setZip] = useState("");
  const [vendorSearch, setVendorSearch] = useState("")
  const [searched, setSearched] = useState(false);
  const [submittedSearch , setSubmittedSearch ] = useState(false);
  const [prevLoc, setPrevLoc] = useState("")
  const { category } = useParams();

  useEffect(() => {
    (async () => {
      if (city) {
        const data = await api.getVendorsCity(city,category);
        if (data.businesses[0].id) {
          setVendors(data.businesses);
        }
        setSearched(true);
      }
    })();
    return () => {
      setVendors([]);
      setSearched(false);
    };
  }, [category, city]);

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleVendorChange = (e) => {
    setVendorSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let location = zip ? zip : city
    let term = vendorSearch ? vendorSearch : category
    const data = await api.getVendorsZip(category, location, term);
    console.log(data)
    if (data.length >= 1){
      setVendors(data);
    }
    // if (data[0].id) {
    //   setVendors(data);
    // }
    setSearched(true);
    setSubmittedSearch(true)
    setVendorSearch("")
    setZip("")
    setPrevLoc(zip ? zip : city)
  }; 

  // const handleVendorSearch = async (e) =>{
  //   e.preventDefault()
  //   const data = await api.getVendorsByName(vendorSearch, city, category);
  //   if (data.businesses[0].id){
  //     setVendors(data.businesses);
  //   }
  //   setSearched(true)
  //   setVendorSearch("")
  // }



  const vendorsList = () => {
    let result = "";
    if (!city && !searched) {
      result = (
        <>
          {" "}
          <h2>
            Input zip code above to search for {CategorySwitch(category)} in
            your area.
          </h2>
          <Loading />{" "}
        </>
      );
    } else if (searched && !vendors[0]) {
      result = (
        <h2>
          Unfortunately, we could not find any vendors in this area. Please try
          another zip code.{" "}
        </h2>
      );
    } else if (city && !vendors[0]) {
      result = <Loading />;
    } 
    else {
      result = <VendorList vendors={vendors} category={category} />;
    }
    return result;
  };

  return (
    <>
      <NavBar />
      <div className="page indexpg-container">
        <div className="top-container">
          {category ? (
            <h1 className="flex-row pg-head"> {CategorySwitch(category)} </h1>
          ) : null}
          <p> ( near {submittedSearch ? prevLoc : city} ) </p>
          <div  className="search-container">
          <form onSubmit={handleSubmit} id="zip-form">
            <input
              className="three-d pg-input zip-search"
              type="text"
              placeholder="Search by 5 Digit Zip Code"
              onChange={handleZipChange}
              value={zip}
              // required
              pattern="[0-9]{5}"
            />
            {/* <button type="submit" className="pg-buttons">
              Search
            </button>
          </form>

          <form onSubmit={handleVendorSearch} id="ven-form"> */}
            <input 
            className="three-d pg-input zip-search"
            placeholder="Search By Vendor Name"
            type="text"
            onChange={handleVendorChange}
            value={vendorSearch}
            /> 
            <button type="submit" className="pg-buttons">
              Search
            </button>
          </form>
          </div>
        </div>
        {vendorsList()}
      </div>
    </>
  );
}
