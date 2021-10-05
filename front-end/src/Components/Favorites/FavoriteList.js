import React, { useState, useEffect, useContext } from "react";
import Favorite from "./Favorite";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { VendorMenu } from "../NavBar/VendorMenu";
import { Link } from "react-router-dom";
import { UserContext } from "../../Providers/UserProvider";
const API = apiURL();

export default function FavoriteList() {
  const loggedInUser = useContext(UserContext);
  const user_id = loggedInUser && loggedInUser.user_id;
  const [favoriteVendors, setFavoriteVendors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterClicked, setFilterClicked] = useState({
    clicked: false,
    category: "",
  });
  console.log(`favoriteslist user_id is ${user_id}`);

  useEffect(() => {
    if (user_id) {
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
    }
    return () => {
      setFavoriteVendors([]);
    };
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

  const filterFavorites = (category, title) => {
    let results = favoriteVendors.filter(
      (vendor) => vendor.vendor_category === category
    );

    setFiltered(results);
    setFilterClicked({ ...filterClicked, clicked: true, category: title });
  };

  const vendorList = () => {
    if (!filterClicked.clicked) {
      return (
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
      );
    } else if (filtered.length >= 1) {
      return (
        <ul
          className={`ven-ul ${filtered.length === 2 ? "two-ul" : null} ${
            filtered.length === 1 ? "one-ul" : null
          }`}
        >
          {filtered.map((vendor) => {
            return (
              <Favorite
                vendors={filtered}
                vendor={vendor}
                key={vendor.vendor_id}
                deleteFav={deleteFav}
              />
            );
          })}
        </ul>
      );
    } else {
      return <h2>No {filterClicked.category} are saved in your favorites.</h2>;
    }
  };

  return (
    <>
      <div className="dropdown">
        <span>Filter By Category &#x2195;</span>

        <ul className="dropdown-content">
          {VendorMenu.map((vendor) => {
            return (
              <li
                onClick={() => filterFavorites(vendor.category, vendor.title)}
                key={vendor.title}
              >
                {vendor.title}
              </li>
            );
          })}
          <li onClick={() => setFilterClicked(false)}> View all </li>
        </ul>
      </div>

      <div className="fave-page-div">
        {favoriteVendors.length > 0 && user_id ? (
          vendorList()
        ) : (
          <>
            <h2>
              {" "}
              No favorite vendors at this time. Browse for vendor's near you to
              add to your favorites !
            </h2>
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
    </>
  );
}
