import React, { useState } from "react";
import { VendorMenu } from "./VendorMenu";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import { userSignOut } from "../../Services/Firebase";

export default function NavBar() {
  const [vendorClicked, setVendorClicked] = useState(false);
  const history = useHistory();
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
      cName: "pg-buttons nav-but",
    },
    {
      title: "My Favorites",
      url: `/favorites`,
      cName: "pg-buttons nav-but",
    }
  ];
  
  const signOut = async () => {
    try {
      let res = await userSignOut();
      if (res === null) {
        history.push("/")
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <nav className="NavBarItems drop">
      <Link to="/dashboard" className="navbar-logo">
        <h1> Event(ful) &#127881;</h1>
      </Link>

      <ul className="accountNav">
        <li className="accountLinks" onClick={handleVendorClick}>
          <span className="pg-buttons nav-but">
            Vendors {vendorClicked ? <> &#x2191; </> : <>&#x2193;</>}
          </span>
        </li>
        {accountMenu.map((item, index) => {
          return (
            <li className="accountLinks" key={index} onClick={closeNav}>
              <Link to={item.url} className={item.cName}>
                {item.title}
              </Link>
            </li>
          );
        })}
        <li className="accountLinks" onClick={signOut}>
          {" "}
          <span className="pg-buttons nav-but logout">Logout</span>
        </li>
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
