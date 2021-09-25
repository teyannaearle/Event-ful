import React from "react";
import Favorite from "./Favorite";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
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
      axios
        .delete(`${API}/favorites/${user_id}/${name}`)
        .then((res) => "");
    } catch (e) {
      console.warn(e);
    }
  };



  return (
    <div>
   
      <ul className="ven-ul">
        {favoriteVendors.length > 0 &&
          favoriteVendors.map((vendor) => {
            return (
              // <Link to={`/favorites/${vendor.vendor_id}`} key={vendor.vendor_id}>
                <Favorite vendor={vendor} user_id={user_id} key={vendor.vendor_id} deleteFav={deleteFav}/>
              // </Link>
            );
          })}
      </ul>
    </div>
  );
}
