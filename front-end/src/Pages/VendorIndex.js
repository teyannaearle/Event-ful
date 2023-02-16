import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../util/apiCalls";
import VendorList from "../Components/VendorIndex/VendorList";
import Loading from "../Components/Loading";
import CategorySwitch from "../Components/CategorySwitch";
// import axios from "axios";
import NavBar from "../Components/NavBar/NavBar";

// const apiKey = process.env.REACT_APP_API_KEY;
// const proxy = "https://morning-spire-06380.herokuapp.com";
// const yelpBase = "https://api.yelp.com/v3/businesses";
// const config = () => {
//   return {
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       withCredentials: true,
//     },
//   };
// };

export default function VendorIndex({ city }) {
  const [vendors, setVendors] = useState([]);
  const [zip, setZip] = useState("");
  const [vendorSearch, setVendorSearch] = useState("")
  const [searched, setSearched] = useState(false);
  const [submittedSearch , setSubmittedSearch ] = useState(false);
  const [prevZip, setPrevZip] = useState("")
  // const [loading, setLoading] = useState(true)
  const { category } = useParams();

  useEffect(() => {
    (async () => {
      if (city) {
        const data = await api.getVendorsCity(city,category);
        if (data.businesses[0].id) {
          setVendors(data.businesses);
          // setLoading(false)
          console.log(data.businesses)
        }
        setSearched(true);
      }
    })();
    return () => {
      setVendors([]);
      setSearched(false);
      // setLoading(true)
    };
  }, [category, city]);
  // useEffect(() => {
  //   try {
  //     axios
  //       .get(
  //         `${proxy}/${yelpBase}/search?term=${category}&longitude=${lng}&latitude=${lat}&category=${category}&radius=16093`,
  //         config()
  //       )
  //       .then((res) => {
  //         const { data } = res;
  //         if (data.businesses[0].id) {
  //           setVendors(data.businesses);
  //         }
  //         setSearched(true);
  //       });
  //   } catch (e) {
  //     return console.warn(e);
  //   }

  //   return () => {
  //     setVendors([])
  //     setSearched(false)
  //   }
  // }, [category, lng, lat]);

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleVendorChange = (e) => {
    setVendorSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await api.getVendorsZip(category, zip);
    if (data[0].id) {
      setVendors(data);
    }
    setSearched(true);
    setSubmittedSearch(true)
    setPrevZip(zip)
  };

  const handleVendorSearch = async (e) =>{
    e.preventDefault()
    const data = await api.getVendorsByName(vendorSearch, city, category);
    console.log(data)
    if (data.businesses[0].id){
      setVendors(data.businesses);
    }
    setSearched(true)
    setVendorSearch("")
  }



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

  // useEffect(()=>{
  //   vendorsList()
  // },[loading, vendorsList])

  return (
    <>
      <NavBar />
      <div className="page indexpg-container">
        <div className="top-container">
          {category ? (
            <h1 className="flex-row pg-head"> {CategorySwitch(category)} </h1>
          ) : null}
          <p> ( near {submittedSearch ? prevZip : city} ) </p>
          <div  className="search-container">
          <form onSubmit={handleSubmit} id="zip-form">
            <input
              className="three-d pg-input zip-search"
              type="text"
              placeholder="Search by 5 Digit Zip Code"
              onChange={handleZipChange}
              value={zip}
              // id="zip-search"
              required
              pattern="[0-9]{5}"
            />
            <button type="submit" className="pg-buttons">
              Search
            </button>
          </form>

          <form onSubmit={handleVendorSearch} id="ven-form">
            <input 
            className="three-d pg-input zip-search"
            placeholder="Search By Vendor Name"
            type="text"
            onChange={handleVendorChange}
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
