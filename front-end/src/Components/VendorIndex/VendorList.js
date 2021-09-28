import React from "react";
import Vendor from "./Vendor";
import { Link } from "react-router-dom";

function VendorList({ vendors, category }) {
  return (
    <ul className="ven-ul">
      {vendors.map((vendor) => (
        <Link to={`/vendor/${category}/${vendor.id}`} key={vendor.id}>
          <Vendor vendor={vendor} category={category} />
        </Link>
      ))}
    </ul>
  );
}

export default VendorList;
