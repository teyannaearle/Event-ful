import api from "../util/apiCalls";
import { apiURL } from "../util/apiURL";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import VendorReviews from "../Components/VendorShow/VendorReviews";
import VendorShowInfo from "../Components/VendorShow/VendorShowInfo";
import Loading from "../Components/Loading";
import CategorySwitch from "../Components/CategorySwitch";
import { UserContext } from "../Providers/UserProvider"
import axios from "axios"
const API = apiURL();

export default function VendorShow() {
  const loggedInUser = useContext(UserContext);
  const [user_id, setUserId] = useState(null);
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

  const { provider_id, category } = useParams();
  const history = useHistory();


  useEffect(() => {
    (async () => {
      const data = await api.getVendor(provider_id);
      const reviewData = await api.getReviews(provider_id);
      if (data && reviewData) {
        setReviews(reviewData);
        setbusiness(data);
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
    };
  }, [provider_id]);

  useEffect(() => {
    (async () => {
      if (loggedInUser) {
        const email = loggedInUser.email;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          setUserId(checkUser.data.payload.user_id);
        }
      }
    })();
    return () => {
      // cleanup
      // setUserId(null)
    };
  }, [loggedInUser]);

  return (
    <>
      <button
        className="pg-buttons back-button"
        onClick={() => history.goBack()}
      >
        {" "}
        &#x21e6; Back to {CategorySwitch(category)}
      </button>

      <div id="vendor-showpage" className="page">
        {business.photos[0] ? (
          <>
            <VendorShowInfo
              business={business}
              user_id={user_id}
              category={category}
            />
            <VendorReviews reviews={reviews} />{" "}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
