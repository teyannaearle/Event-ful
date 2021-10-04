import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import BookedVendor from "./BookedVendor";
import { apiURL } from "../../util/apiURL";
import { VendorMenu } from "../NavBar/VendorMenu";
import { UserContext } from "../../Providers/UserProvider";
const API = apiURL();

export default function BookedVendorList() {
  const loggedInUser = useContext(UserContext);
  const user_id = loggedInUser ? loggedInUser.user_id : null;
  const [bookedVendors, setBookedVendors] = useState([]);
  const { event_id } = useParams();

  useEffect(() => {
    if (user_id) {
      axios
        .get(`${API}/booked/${user_id}/${event_id}`)
        .then(
          (res) => {
            console.log("got booked api response")
            console.log(res)
            if (res.data.payload.length > 0) {
              setBookedVendors(res.data.message);
            }
          },
          (e) => {
            console.error(e);
          }
        )
        .catch((e) => {
          console.error(e);
        });
    }
    return () => {
      setBookedVendors([]);
    };
  }, [user_id, event_id]);

  return (
    <div className="booked-section">
      {bookedVendors.length > 0 ? (
        <ul
          className={`ven-ul  ${bookedVendors.length === 1 ? "one-ul" : null} ${
            bookedVendors.length === 2 ? "two-ul" : null
          }`}
        >
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
                <Link to={vendor.url} key={vendor.url}>
                  <li className="browse-li">{vendor.title}</li>
                </Link>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
