import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Providers/UserProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookedVendor from "./BookedVendor";
import { apiURL } from "../../util/apiURL";
import breakdance from "../../assets/breakdance.gif"
const API = apiURL();

export default function BookedVendorList({ user_id }) {
  const [bookedVendors, setBookedVendors] = useState([]);
  const { event_id } = useParams();
  const loggedInUser = useContext(UserContext);
  const  accessToken  = loggedInUser.currentUser ? loggedInUser.currentUser.accessToken : null

  useEffect(() => {
    if (user_id) {
      axios
        .get(`${API}/booked/${user_id}/${event_id}` , {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then(
          (res) => {
            if (res.data.payload.length > 0) {
              setBookedVendors(res.data.payload);
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
  }, [user_id, event_id, accessToken]);

  return (
    <div className="booked-section">
      {bookedVendors.length > 0 ? (
        <ul
          className={`ven-ul  ${bookedVendors.length === 1 ? "one-ul" : null} ${
            bookedVendors.length === 2 ? "two-ul" : null
          }`}
        >
          {bookedVendors.map((vendor) => {
            return (
              <li
                className={`flex-col three-d ven-li ${
                  bookedVendors.length === 1 ? "one-li" : null
                }`}
                key={vendor.vendor_name}
              >
                <BookedVendor vendor={vendor} />{" "}
              </li>
            );
          })}{" "}
        </ul>
      ) : (

      <> <h2 className="none">No booked vendors ... </h2> <p className="yet">( yet ! )</p>
      
      <img src={breakdance} alt="breakdance" /> </>
   
      )}
    </div>
  );
}
