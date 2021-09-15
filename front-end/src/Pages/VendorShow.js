import api from "../util/apiCalls";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VendorReviews from "../Components/VendorShow/VendorReviews";
import VendorShowInfo from "../Components/VendorShow/VendorShowInfo";
import Loading from "../Components/Loading";

export default function VendorShow() {

  const [business, setbusiness] = useState({
    photos: [],
    categories: [{ title: "" }],
    location: { display_address: [] },
  });

  const [reviews, setReviews] = useState([
    {
      user: { image_url: "", name: "" },
    },
  ]);

  const { provider_id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await api.getVendor(provider_id);
      const reviewData = await api.getReviews(provider_id);
      if (data && reviewData) {
        setReviews(reviewData);
        setbusiness(data);
      } else {
        // ---------- ERROR PAGE  ---------------
      }
    })(); 
  }, [provider_id]);

  return (
    <div id="vendor-showpage" className="page">
      {business.photos[0] ? (
        <>
          <VendorShowInfo business={business} />
          <VendorReviews reviews={reviews} />{" "}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
