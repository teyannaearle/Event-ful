import React, { useState, useEffect } from "react";
import api from "../util/apiCalls";

function VendorList() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    (async () => {
      const categories = await api.getVendors();
      setCategory(categories);
    })();
  }, []);

  return (
    <div>
      <h1>{category.name}</h1>
    </div>
  );
}

export default VendorList;
