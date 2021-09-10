import React from "react";
import Favorite from "./Favorite";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../util/apiURL";

const API = apiURL() 



export default function FavoriteList() {
  const [favoriteVendors, setFavoriteVendors] = useState([]);
  const { user_id } = useParams();

  useEffect(() => {
    axios.get(`${API}/favorites/${user_id}`)
      .then(
        (res) => {
          console.log(res)
          //setFavoriteVendors(res.data);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });
  }, [user_id]);

  return (
    <div>
      {favoriteVendors.length > 0 && (
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
