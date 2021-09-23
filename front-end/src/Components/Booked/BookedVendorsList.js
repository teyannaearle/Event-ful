import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookedVendor from "./BookedVendor";
import { apiURL } from "../../util/apiURL";
import "./BookedVendorsList.css";

const API = apiURL();

export default function BookedVendorList({user_id}) {
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
    <div>
      Booked Vendor List
      <section>
        <table className="three-d">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Vendor Address</th>
              <th>Vendor Phone</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookedVendors.length > 0 &&
              bookedVendors.map((vendor) => {
                return <BookedVendor vendor={vendor} />;
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
