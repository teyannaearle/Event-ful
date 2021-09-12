import React from "react";
import Vendor from "./Vendor";


function VendorList({ vendors, category }) {
  return (


    <ul className="ven-ul">
      {vendors.map((vendor) => (
        <Vendor vendor={vendor} category={category} key={vendor.id}/>
      ))}
    </ul>
  );
}

export default VendorList;
