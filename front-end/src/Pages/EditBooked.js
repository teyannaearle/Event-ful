import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import CategorySwitch from "../Components/CategorySwitch";
import Vendor from "../Components/VendorIndex/Vendor";
import api from "../util/apiCalls";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import Loading from "../Components/Loading";

const API = apiURL();

const parseNum = (str) => +str.replace(/[^.\d]/g, "");

function EditBooked({ user_id, lat, lng, formatter }) {
  const { event_id, category } = useParams();
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState("");
  const [cost, setCost] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [bookedStatus, setBookedStatus] = useState({});
  const [zip, setZip] = useState("");
  const [searched, setSearched] = useState(false);
  const history = useHistory();

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
  }, [category, lng, lat, searched]);

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleZipSubmit = async (e) => {
    e.preventDefault();
    // if (zip.length !== 5) {
    //   window.alert("Zip code is not valid");
    // } else {
    //   const data = await api.getVendorsZip(category, zip);
    //   setVendors(data);
    //   setSearched(true);
    // }
    const data = await api.getVendorsZip(category, zip);
    setVendors(data);
    setSearched(true);
  };

  const handleSelection = (selected) => {
    const loc = selected.location.display_address.join();
    let bookedbody = {
      vendor_name: selected.name,
      vendor_address: loc,
      vendor_phone_number: parseNum(selected.phone),
      category: category,
      rating: selected.rating,
      vendor_image: selected.image_url,
    };

    let checklistBody = {
      is_completed: true,
      task_name: category,
      // user_id: user_id,
      // event_id: event_id,
    };

    if (!vendor) {
      try {
        axios
          .post(`${API}/booked/${user_id}/${event_id}`, bookedbody)
          .then((res) => {
            setVendor(selected);
            setVendors([]);
            setSearched(false);
          });
      } catch (e) {
        console.error(e);
      }

      try {
        axios
          .put(`${API}/checklist/${user_id}/${event_id}`, checklistBody)
          .then((response) => {});
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        axios
          .put(`${API}/booked/${user_id}/${event_id}`, bookedbody)
          .then((res) => {
            setVendor(selected);
            setVendors([]);
            setSearched(false);
          });
      } catch {}

      try {
        axios.put(`${API}/checklist/${user_id}/${event_id}`, checklistBody);
      } catch {}
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
      return <Loading />;
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
            <button className="pg-buttons" onClick={() => setShowForm(true)}>
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
        <input
          id={category}
          placeholder="cost"
          value={cost}
          onChange={(e) => handleFormChange(e)}
          type="number"
          min="0"
          step=".01"
        />
        <button type="submit" className="pg-buttons">
          Update
        </button>
      </form>
    );
  };

  const directions = () => {
    let direction = "";
    if ((!vendor && !searched && lat && lng) || searched) {
      direction = (
        <h2>
          Browse below or search by zip code to select the vendor that you've
          booked
        </h2>
      );
    } else if (vendor && !searched) {
      direction = (
        <>
        <h2> Input discussed cost below  </h2>
          
        <h2>If you have changed to a new vendor, search by zip code above  </h2>
        </>
      );
    } else if (searched && !vendors) {
      direction = (
        <h2>
          Unfortunately, we could not find any vendors in this area. Please try
          another zip code.{" "}
        </h2>
      );
    } else if (!lng && !lat) {
      direction = (
        <h2>
          Search by zip code above to select the vendor that you've booked
        </h2>
      );
    }

    return direction;
  };

  return (
    <>
      <button
        className="pg-buttons back-button"
        onClick={() => history.goBack()}
      >
        {" "}
        &#x21e6; Back to Event
      </button>
      <div className="page indexpg-container">
        <h1>{CategorySwitch(category)}</h1>

        <form onSubmit={handleZipSubmit} id="zip-form">
          <input
            className="three-d pg-input"
            type="text"
            placeholder="Zip Code - Must be 5 digits -"
            onChange={handleZipChange}
            value={zip}
            id="zip-search"
            required
            pattern="[0-9]{5}"
          />
          <button type="submit" className="pg-buttons">
            Search
          </button>
        </form>
        {directions()}
        {/* {!vendor && !searched && lat ? <h2>Browse below or search by zip code to select the vendor that you've booked</h2> : null}
        {vendor && !searched ?<h2> Search by zip code above if you have changed to a new vendor </h2>: null} */}
        {/* {!lat && !lng? "search by zip above" : null} */}
        {vendor && !searched ? vendorShow() : vendorsShow()}
      </div>
    </>
  );
}

export default EditBooked;
