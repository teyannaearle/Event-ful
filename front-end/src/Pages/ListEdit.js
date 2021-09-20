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
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState("");
  const [cost, setCost] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [bookedStatus, setBookedStatus] = useState({});
  const [zip, setZip] = useState("");
  const [searched, setSearched] = useState(false)
  

  useEffect(() => {
    let vendorCategories = [];
    let booked = {};

    try {
      axios.get(`${API}/checklist/${user_id}/${event_id}`).then((response) => {
        const data = response.data.payload;
        vendorCategories = data.map((point) => {
          return {
            name: point.task_name,
            booked: point.is_completed,
            cost: point.task_cost,
            id: point.task_id,
          };
        });

        for (let category of vendorCategories) {
          booked[category.name] = category.booked;
        }

        setBookedStatus(booked);
      });
    } catch (e) {
      console.error(e);
    }

    return () => {
      setBookedStatus({});
    };
  }, [event_id, user_id]);

  useEffect(() => {
    if (bookedStatus[category] === true) {
      try {
        axios
          .get(`${API}/booked/category/${category}/${user_id}/${event_id}`)
          .then((res) => {
            let result = res.data.payload;
            setVendor({
              name: result.vendor_name,
              image_url: result.vendor_image,
              display_phone: result.vendor_phone_number,
              rating: result.rating,
            });
            setCost(result.amount);
          });
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      setVendor("");
      setCost(0);
    };
  }, [category, event_id, user_id, bookedStatus]);


  useEffect(() => {
    (async () => {
      if (!searched && lat && lng) {
        const data = await api.getVendorsLongLag(lng, lat, category);
        setVendors(data.businesses);
      }
    })();
  }, [category, lng, lat, vendor]);


  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (zip.length !== 5) {
      window.alert("Zip code is not valid");
    } else {
      const data = await api.getVendorsZip(category, zip);
      setVendors(data);
      setSearched(true)
    }
  };


  const handleSelection = (selected) => {
    const loc = selected.location.display_address.join();
    let bookedbody = {
      vendor_name: selected.name,
      vendor_address: loc,
      vendor_phone_number: parseNum(selected.phone),
      category: category,
      rating: selected.rating,
      vendor_image: selected.image_url
    };

    if (!vendor){

    try {
      axios
        .post(`${API}/booked/${user_id}/${event_id}`, bookedbody)
        .then((res) => {
          setVendor(selected);
          setVendors([]);
          setSearched(false)
        });
    } catch (e) {
      console.error(e);
    }

    let checklistBody = {
      is_completed: true,
      task_name: category,
      user_id: user_id,
      event_id: event_id,
    };

    try {
      axios
        .put(`${API}/checklist/${user_id}/${event_id}`, checklistBody)
        .then((response) => {});
    } catch (e) {
      console.error(e);
    }
  } 
  };

  const handleFormChange = (e) => {
    setCost(e.target.value);
  };
  const handleCostSubmission = (e) => {
    e.preventDefault();
    let checklistBody = {
      task_cost: cost,
      task_name: category,
    };

    try {
      axios.put(`${API}/checklist/cost/${user_id}/${event_id}`, checklistBody);
      // .then((res) => );
    } catch (e) {
      console.error(e);
    }

    let bookedBody = {
      amount: cost,
      vendor_name: vendor.name,
    };

    try {
      axios.put(`${API}/booked/cost/${user_id}/${event_id}`, bookedBody);
      // .then((res) => console.log("booked" + res));
    } catch (e) {
      console.error(e);
    }

    setShowForm(false);
  };

  const vendorsShow = () => {
    if (vendors[0]) {
      return (
        <ul className="ven-ul">
          {vendors.map((vendor) => {
            return (
              <button onClick={() => handleSelection(vendor)} key={vendor.id}>
                <Vendor vendor={vendor} category={category} />
              </button>
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
      <div className="ven-info">
        <Vendor vendor={vendor} category={category} />
        <div className="three-d ven-cost">
          <p>Cost: {formatter.format(cost)}</p>

          {showForm ? (
            form()
          ) : (
            <button onClick={() => setShowForm(true)}>
              {cost ? <>Edit Cost</> : <>Add Cost</>}
            </button>
          )}
        </div>
      </div>
    );
  };


  const form = (e) => {
    return (
      <form onSubmit={handleCostSubmission} className="ven-cost">
        <button type="submit">Update</button>
        <input
          id={category}
          placeholder="cost"
          value={cost}
          onChange={(e) => handleFormChange(e)}
          type="number"
          min="0"
          step=".01"
        />
      </form>
    );
  };

  return (
    <div className="page indexpg-container">
      <h1>{CategorySwitch(category)}</h1>
      <form onSubmit={handleSubmit} id="zip-form">
        <input
          className="three-d"
          type="number"
          placeholder="Event zip code"
          onChange={handleZipChange}
          value={zip}
          id="zip-search"
        />
        <button type="submit">Search</button>
      </form>
      {vendor && !searched ? vendorShow() : vendorsShow()}
    </div>
  );
}

export default ListEdit;
