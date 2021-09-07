import React from "react";
import Favorite from "./Favorite";
import axios from "axios";
import { useState, useEffect } from "react";

// const API = apiURL() // edit after database setup

export default function FavoriteList() {
  const [favoriteVendors, setFavoriteVendors] = useState([]);

  useEffect(() => {
   // axios.get(`${API}/favorites`)
   axios.get(``)
      .then(
        (res) => {
          setFavoriteVendors(res.data);
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
      {favoriteVendors.length > 0 && (
        <section>
          <table>
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Vendor Address</th>
                Vendor Phone
              </tr>
            </thead>
            <tbody>
              {favoriteVendors.map((vendor) => {
                return <Favorite vendor={vendor} />;
              })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
