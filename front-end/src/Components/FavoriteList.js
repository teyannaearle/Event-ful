import React from 'react'
import Favorite from './Favorite'
import axios from "axios"
import { useState, useEffect } from "react";

// const API = apiURL() // edit after database setup
export default function FavoriteList() {
    const [favoriteVendors, setFavoriteVendors] = useState([])
    
    useEffect(() => {
        axios
          // .get(`${API}/favorites`)
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
        <ul>
        {favoriteVendors.map((vendor) => {
          return (
            <li key={vendor.id}>
              <Favorite vendor={vendor} />
            </li>
          );
        })}
      </ul>
    )
}
