import React, { useState } from "react";
import { VendorMenu } from "./VendorMenu";
import { Link, useParams } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({user_id}) {
  // const { user_id } = useParams();
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
      url: `/dashboard`,
      cName: "nav-links",
    },
    {
      title: "My Favorites",
      url: `/favorites`,
      cName: "nav-links",
    },
    {
      title: "Settings",
      url: `/settings`,
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
      <Link to="/">
      <h1 className="navbar-logo">
        Event(ful)
        {/* <i className="fab fa-react"></i> */}
      </h1>
      </Link>

      {/* <FontAwesomeIcon icon="fa-solid fa-face-party" /> */}

      <ul className="accountNav">
        {accountMenu.map((item, index) => {
          return (
            <li className="accountLinks" key={index} onClick={closeNav}>
              <Link to={item.url} className="pg-buttons nav-but">{item.title}</Link>
            </li>
          );
        })}
      </ul>

      <div className="menu-icon" onClick={handleVendorClick}>
        <i className={vendorClicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

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