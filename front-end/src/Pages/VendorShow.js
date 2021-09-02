import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../util/apiCalls";

export default function VendorShow() {
  const [business, setbusiness] = useState({
    photos: [],
    categories: [{title: ""}],
    location: {display_address: []},
  });

  const { provider_id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await api.getVendor(provider_id);
      setbusiness(data);
    })();
  }, [provider_id]);

  return (
    <div>
      <h1>{business.name} </h1>

      {business.photos.map((photo, i) => (
        <img src={photo} key={i} alt="service" width="250px" />
      ))}
      <p>{business.price}</p>
      <p>{business.location.display_address.join(",")}</p>
      <p>{business.display_phone}</p>
      <p>{business.rating}</p> 
      {business.categories.map((category, i) => <p key={i}>{category.title}</p>)}
    </div>
  );
}
