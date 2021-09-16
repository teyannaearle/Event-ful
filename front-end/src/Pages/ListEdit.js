import React, { useState } from "react";
import { useParams } from "react-router";
import CategorySwitch from "../Components/CategorySwitch";
import Vendor from "../Components/VendorIndex/Vendor";

function ListEdit({ user_id }) {
  const { event_id, task_id, category } = useParams();
  const [search, setSearch] = useState("");
  const [searchClicked, setSearchClicked] = useState(false)
  const [vendors, setVendors] = useState([]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log("search");
  };

  const vendorShow = () => {
    if (vendors[0]) {
      return (
        <ul>
          {vendors.map((vendor) => {
            <li><Vendor vendor={vendor} category={category}/></li>;
          })}
        </ul>
      );
    } else {
        return(
            <h1>No vendors</h1>
        )
    }
  };
  
  return (
    <div className="page">
      <h1>{CategorySwitch(category)}</h1>
      <form onSubmit={handleSearch}>
        <input
          placeholder="search vendor"
          onChange={handleSearchInput}
          value={search}
        />
        <button type="submit">Search</button>
        { searchClicked ? vendorShow() : null}
      </form>
    </div>
  );
}

export default ListEdit;
