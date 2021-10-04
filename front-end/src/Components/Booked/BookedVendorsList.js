import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BookedVendor from "./BookedVendor";
import { apiURL } from "../../util/apiURL";
import { VendorMenu } from "../NavBar/VendorMenu";

const API = apiURL();

export default function BookedVendorList({ user_id }) {
  const [bookedVendors, setBookedVendors] = useState([]);
  const { event_id } = useParams();

  useEffect(() => {
    axios
      .get(`${API}/booked/${user_id}/${event_id}`)
      .then(
        (res) => {
          setBookedVendors(res.data.message);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });
  }, [user_id, event_id]);
 
  return (
    <div className="booked-section">
      {bookedVendors.length > 0 ? (
        <ul className={`ven-ul  ${bookedVendors.length === 1 ? "one-ul" : null} ${
          bookedVendors.length === 2 ? "two-ul" : null
        }`}>
          {bookedVendors.map((vendor) => {

          return <li className={`flex-col three-d ven-li ${bookedVendors.length === 1 ? "one-li" : null}`} key={vendor.vendor_name}>

          <BookedVendor vendor={vendor} /> </li>

          })}{" "}
        </ul>
      ) : (
        <>
        <h2>No booked vendors at this time. Browse for vendor's near you.</h2>
        <ul className="browse-ul">
            {VendorMenu.map((vendor) => {
              return (
                <Link to={vendor.url}  key={vendor.url}>
                <li className="browse-li">
               {vendor.title}
                </li>
                </Link>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
