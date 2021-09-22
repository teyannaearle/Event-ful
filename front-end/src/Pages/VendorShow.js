import api from "../util/apiCalls";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VendorReviews from "../Components/VendorShow/VendorReviews";
import VendorShowInfo from "../Components/VendorShow/VendorShowInfo";
import Loading from "../Components/Loading";
import CategorySwitch from "../Components/CategorySwitch";




export default function VendorShow({user_id}) {
  const history = useHistory()
   const { provider_id, category } = useParams();
  

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

    return () => {
      setReviews([
        {
          user: { image_url: "", name: "" },
        },
      ]);
      setbusiness({
        photos: [],
        categories: [{ title: "" }],
        location: { display_address: [] },
      });
    }
  }, [provider_id]);

  const goBack = () => {
    history.goBack()
  }

  return (
    <>
            <button className="pg-buttons back-button" onClick={goBack}> &#x21e6; Back to {CategorySwitch(category)}</button>

    <div id="vendor-showpage" className="page">
      {business.photos[0] ? (
        <>
          <VendorShowInfo business={business} user_id={user_id}/>
          <VendorReviews reviews={reviews} />{" "}
        </>
      ) : (
        <Loading />
      )}
    </div>
    </>
  );
}
