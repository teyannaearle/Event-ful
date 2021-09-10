import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useGeoLocation from "../hooks/useGeoLocation";
import api from "../util/apiCalls";

export default function VendorIndex() {
  const [vendors, setVendors] = useState({});
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const { category } = useParams();
  const location = useGeoLocation();

  useEffect(() => {
    setLat(location.coordinates.latitude);
    setLng(location.coordinates.longitude);
  }, [location]);

  useEffect(() => {
    (async () => {
      if (lng && lat) {
        const data = await api.getVendorsLongLag(lng, lat, category);
        setVendors(data.businesses);
      } else {
        // EITHER PULL ZIP FROM EVENT OR ASK USER FOR ZIP --- STILL UNSURE
        // const data = await api.getVendorsZip(category, zip)
        // setVendors(data)
      }
    })();
  }, [category, lng, lat]);

  console.log(vendors);

  return (
    <ul>
      {vendors.map((vendor) => {
        return (
          <li>
            <img src={vendor.image_url} alt={vendor.name} height="200" />
            <h1>{vendor.name}</h1>
            {/* Display distance */}
            <p>Phone: {vendor.display_phone}</p>
            <p>Avg Rating: {vendor.rating}</p>
          </li>
        );
      })}
    </ul>
  );
}
