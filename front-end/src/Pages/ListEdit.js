import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import CategorySwitch from "../Components/CategorySwitch";
import Vendor from "../Components/VendorIndex/Vendor";
import api from "../util/apiCalls";
import axios from "axios";
import { apiURL } from "../util/apiURL";

const API = apiURL();

const parseNum = (str) => +str.replace(/[^.\d]/g, "");

function ListEdit({ user_id, lat, lng, formatter }) {
  const { event_id, category } = useParams();
  // const [search, setSearch] = useState("");
  // const [searchClicked, setSearchClicked] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState("");
  const [cost, setCost] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(`${API}/booked/category/${category}/${user_id}/${event_id}`)
        .then((res) => {
          let result = res.data.payload
          setVendor(
            {
              name: result.vendor_name,
              image_url: "https://i.stack.imgur.com/y9DpT.jpg",
              display_phone: result.vendor_phone_number,
              rating: result.rating
            }
          );
          // setVendors([]);
        });
    } catch {}
  }, [category, event_id, user_id]);



  useEffect(() => {
    (async () => {
      if (!vendor && lat && lng) {
        const data = await api.getVendorsLongLag(lng, lat, category);
        setVendors(data.businesses);
        // setSearched(true)
      }
    })();
  }, [category, lng, lat, vendor]);

  // const handleSearchInput = (e) => {
  //   setSearch(e.target.value);
  // };

  // const handleSearch = async () => {
  //   console.log("search");
  // };

  const handleSelection = (selected) => {
    const loc = selected.location.display_address.join();
    let bookedbody = {
      vendor_name: selected.name,
      vendor_address: loc,
      vendor_phone_number: parseNum(selected.phone),
      category: category,
      rating: selected.rating
    };

    try {
      axios
        .post(`${API}/booked/${user_id}/${event_id}`, bookedbody)
        .then((res) => {
          setVendor(selected);
          setVendors([]);
        });
    } catch {}

    let checklistBody = {
      is_completed: true,
      task_name: category,
      user_id: user_id,
      event_id: event_id,
    };

    try {
      axios
        .put(`${API}/checklist/${user_id}/${event_id}`, checklistBody)
        .then((response) => {
        });
    } catch {}
  };

  const handleFormChange = (e) => {
    setCost(e.target.value);
  };
  const handleCostSubmission = () => {
    let checklistbody = {
      task_cost: cost,
      task_name: category,
    };

    try {
      axios
        .put(`${API}/checklist/cost/${user_id}/${event_id}`, checklistbody)
        // .then((res) => );
    } catch {}
    let bookedBody = {
      amount: cost,
      vendor_name: vendor.name,
    };

    try {
      axios
        .put(`${API}/booked/cost/${user_id}/${event_id}`, bookedBody)
        // .then((res) => console.log("booked" + res));
    } catch {}

    setShowForm(false);
  };

  const vendorsShow = () => {
    if (vendors[0]) {
      return (
        <ul>
          {vendors.map((vendor) => {
            return (
              <li key={vendor.id}>
                <button onClick={() => handleSelection(vendor)}>
                  <Vendor vendor={vendor} category={category} />
                </button>
              </li>
            );
          })}
        </ul>
      );
    } else {
      return <h1>No vendors</h1>;
    }
  };

  const vendorShow = () => {
    return (
      <div>
        <Vendor vendor={vendor} category={category} />
        <div>
          <p>Cost: {formatter.format(cost)}</p>
          <button onClick={() => setShowForm(true)}>
            {cost ? <>Edit Cost</> : <>Add Cost</>}
          </button>
        </div>
      </div>
    );
  };

  const form = () => {
    return (
      <form onSubmit={handleCostSubmission}>
        <input
          id={category}
          placeholder="cost"
          value={cost}
          onChange={(e) => handleFormChange(e)}
          type="number"
          min="0"
          step=".01"
        />
        <button type="submit">Update</button>
      </form>
    );
  };

  return (
    <div className="page">
      <h1>{CategorySwitch(category)}</h1>
      {/* <form onSubmit={handleSearch}>
        <input
          placeholder="search vendor"
          onChange={handleSearchInput}
          value={search}
        />
        <button type="submit">Search</button>
      </form> */}

      {vendor ? vendorShow() : vendorsShow()}
      {showForm ? form() : null}
    </div>
  );
}

export default ListEdit;
