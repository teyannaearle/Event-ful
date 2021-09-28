import React, { useState } from "react";
import { VendorMenu } from "./VendorMenu";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
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
    // {
    //   title: "Settings",
    //   url: `/settings`,
    //   cName: "nav-links",
    // },
    {
      title: "Logout",
      url: "/logo",
      cName: "nav-links-mobile",
    },
  ];

  return (
    <nav className="NavBarItems">


      <h1 className="navbar-logo">
        Event(ful) &#127881;
      </h1>

      <ul className="accountNav">
        <li className="accountLinks" onClick={handleVendorClick}>
          <span className="pg-buttons nav-but">
            Vendors {vendorClicked ? <> &#x2191; </> : <>&#x2193;</>}
          </span>
        </li>
        {accountMenu.map((item, index) => {
          return (
            <li className="accountLinks" key={index} onClick={closeNav}>
              <Link to={item.url} className="pg-buttons nav-but">
                {item.title}
              </Link>
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
