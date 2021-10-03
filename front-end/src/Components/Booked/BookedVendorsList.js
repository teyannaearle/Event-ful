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
  const [user_id, setUserId] = useState(null);
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

  useEffect(() => {
    (async () => {
      if (loggedInUser) {
        const email = loggedInUser.email;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          setUserId(checkUser.data.payload.user_id);
        }
      }
    })();
    return () => {
      // cleanup
      // setUserId(null)
    };
  }, [loggedInUser]);

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
                key={vendor.id}
              >
                <BookedVendor vendor={vendor} />{" "}
              </li>
            );
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
