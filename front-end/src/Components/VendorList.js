import React from "react";
import Vendor from "./Vendor";


function VendorList({ vendors }) {
  return (
    <ul className="ven-ul">
      {vendors.map((vendor) => (
        <Vendor vendor={vendor} />
      ))}
    </ul>
  );
}

export default VendorList;
