import React from "react";
import Favorite from "./Favorite";
import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../../util/apiURL";
import { VendorMenu } from "../NavBar/VendorMenu";
import { Link } from "react-router-dom";

const API = apiURL();

export default function FavoriteList({ user_id }) {
  const [favoriteVendors, setFavoriteVendors] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/favorites/${user_id}`)
      .then(
        (res) => {
          setFavoriteVendors(res.data.message);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });
  }, [user_id]);

  const deleteFav = (name) => {
    try {
      axios.delete(`${API}/favorites/${user_id}/${name}`).then((res) => {
        const faveCopy = [...favoriteVendors];
        const index = faveCopy.findIndex(
          (vendor) => vendor.vendor_name === name
        );
        faveCopy.splice(index, 1);
        setFavoriteVendors(faveCopy);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div>
      {favoriteVendors.length > 0 ? (
        <ul
          className={`ven-ul ${
            favoriteVendors.length === 2 ? "two-ul" : null
          } ${favoriteVendors.length === 1 ? "one-ul" : null}`}
        >
          {favoriteVendors.map((vendor) => {
            return (
              <Favorite
                vendors={favoriteVendors}
                vendor={vendor}
                user_id={user_id}
                key={vendor.vendor_id}
                deleteFav={deleteFav}
              />
            );
          })}
        </ul>
      ) : (
        <>
          <h2>
            {" "}
            No favorite vendors at this time. Browse for vendor's near you to add to your
            favorites !
          </h2>
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
