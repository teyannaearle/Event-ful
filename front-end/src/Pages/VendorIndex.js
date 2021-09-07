import VendorList from "../Components/VendorList"
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
        setVendors(data);
      } else {
        // EITHER PULL ZIP FROM EVENT OR ASK USER FOR ZIP --- STILL UNSURE
        // const data = await api.getVendorsZip(category, zip)
        // setVendors(data)
      }
    })();
  }, [category, lng, lat]);

  return <div>Vector Index Page</div>;
}
