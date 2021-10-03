import React, { useState, useContext, useEffect } from "react";
import { VendorMenu } from "./VendorMenu";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import { userSignOut } from "../../Services/Firebase";
import { UserContext } from "../../Providers/UserProvider";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

const API = apiURL();

export default function NavBar() {
  const [vendorClicked, setVendorClicked] = useState(false);
  const [user_id, setUserId] = useState(null);
  const history = useHistory();
  const handleVendorClick = () => {
    setVendorClicked(!vendorClicked);
  };
  const loggedInUser = useContext(UserContext);
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
    },
    // {
    //   title: "Settings",
    //   url: `/settings`,
    //   cName: "nav-links",
    // },
    // {
    //   title: "Logout",
    //   url: "/logo",
    //   cName: "nav-links-mobile",
    // },
  ];
  const signOut = async () => {
    try {
      let res = await userSignOut();
      if (res === null) {
        history.push("/");
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    (async () => {
      if (loggedInUser) {
        const email = loggedInUser.email;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          // console.log("checkuser app");
          // console.log(checkUser.data.payload.user_id);
          setUserId(checkUser.data.payload.user_id);
        }
      }
    })();
    return () => {
      // cleanup
      // setUserId(null)
    };
  }, [loggedInUser]);

  return (
    <nav className="NavBarItems">
      <Link to="/">
        <h1 className="navbar-logo">Event(ful) &#127881;</h1>
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
          <span className="pg-buttons nav-but">Logout</span>
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
