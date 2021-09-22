import React, { useState } from "react";
import { VendorMenu } from "./VendorMenu";
import { Link, useParams } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const { user_id } = useParams();
  const [vendorClicked, setVendorClicked] = useState(false);

  const handleVendorClick = () => {
    setVendorClicked(!vendorClicked);
  };

  const closeNav = () => {
    setVendorClicked(false);
  };

  const accountMenu = [
    {
      title: "Dashboard",
      url: `/dashboard/${user_id}`,
      cName: "nav-links",
    },
    {
      title: "My Favorites",
      url: `/favorites/${user_id}`,
      cName: "nav-links",
    },
    {
      title: "Settings",
      url: `/settings/${user_id}`,
      cName: "nav-links",
    },
    {
      title: "Logout",
      url: "/logo",
      cName: "nav-links-mobile",
    },
  ];

  return (
    <nav className="NavBarItems">
      <h1 className="navbar-logo">
        Event(ful)
        {/* <i className="fab fa-react"></i> */}
      </h1>

      {/* <FontAwesomeIcon icon="fa-solid fa-face-party" /> */}
      <div className="menu-icon" onClick={handleVendorClick}>
        <i className={vendorClicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      
      <ul className="accountNav">
        {accountMenu.map((item, index) => {
          return (
            <li className="accountLinks" key={index}>
              <Link to={item.url}>{item.title}</Link>
            </li>
          );
        })}
      </ul>

      

      <ul className={vendorClicked ? "nav-menu active" : "nav-menu"}>
        {VendorMenu.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.url} className={item.cName} onClick={closeNav}>
                {item.title}{" "}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
