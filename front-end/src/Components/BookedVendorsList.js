import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BookedVendor from "./BookedVendor"

// const API = apiURL() // edit after database setup

export default function FavoriteList() {
  const [bookedVendors, setBookedVendors] = useState([]);

  useEffect(() => {
   // axios.get(`${API}/bookedvendors`)
   axios.get(``)
      .then(
        (res) => {
          setBookedVendors(res.data);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div>
      {bookedVendors.length > 0 && (
        <section>
          <table>
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Vendor Address</th>
                <th>Vendor Phone</th>
              </tr>
            </thead>
            <tbody>
              {bookedVendors.map((vendor) => {
                return <BookedVendor vendor={vendor} />;
              })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
