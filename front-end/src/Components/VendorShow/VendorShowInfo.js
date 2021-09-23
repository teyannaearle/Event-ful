import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Ratings from "react-ratings-declarative";
import { Carousel } from "react-responsive-carousel";
import { apiURL } from "../../util/apiURL";



//const parseNum = str => +str.replace(/[^.\d]/g, '')

const API = apiURL()

function VendorShowInfo({ business, user_id, category }) {
  const [favorite, setFavorite] = useState(false);
console.log(business)
console.log(business.rating)


  useEffect(()=>{
    try {
      axios.get(`${API}/favorites/${user_id}`).then((res) => {
        let index = res.data.message.findIndex((elem) => elem.vendor_name === business.name )
        if (index > -1) {
         setFavorite(true)
        }
      });
    } catch (e) {
      console.warn(e)
    }

    return () => {
      setFavorite(false)
    }
  }, [business.name, user_id])
  

  
    const handleFav = () => {
      setFavorite(!favorite)
      if (!favorite === false) {
        try {
           axios
            .delete(`${API}/favorites/${user_id}/${business.name}`)
            .then((res) => "");
        } catch (e) {
          console.warn(e)
        } 
      } else {
        const loc = business.location.display_address.join();
        const body = {
          vendor_name: business.name,
          vendor_address: loc,
          vendor_phone_number: business.display_phone,
          vendor_id: business.id, 
          vendor_image: business.photos[0], 
          vendor_category: category, 
          vendor_rating: business.rating
        };
        try { 
          axios
            .post(`${API}/favorites/${user_id}`, body)
            .then((res) => "");
        } catch (e) {
          console.warn(e)
        }
      }
    }

  return (
    <>
      <h1>{business.name} </h1>
      <div className="ven-info page three-d">

      <div className="car-wrap">
        <Carousel showThumbs={false} autoPlay={true}>
          {business.photos.map((photo, i) => (
            <img src={photo} alt="service" className="vendor-imgs" key={i} />
          ))}
        </Carousel>
      </div>



      <div id="ven-info">
        <div className="flex-row">
          {business.categories.map((category, i) =>
            category.title ===
            business.categories[business.categories.length - 1].title ? (
              <p key={i}>{category.title}</p>
            ) : (
              <p key={i}>{category.title} - &nbsp;</p>
            )
          )}
        </div>

        <div className="flex-row">
          <Ratings rating={business.rating} widgetRatedColors="steelblue">
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="30px" />
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="20px" />
          </Ratings>
        </div>

<h2> Contact Information </h2>
        <p>{business.price}</p>
        <p>{business.display_phone}</p>

       {business.location.display_address.map((point, i) => (
          <p key={i}>{point}</p>
        ))}

   

        <div className="book-fav">

          <button onClick={handleFav} className="pg-buttons">
            {!favorite ? <> Favorite &#63;</> : <> Favorite &#10003;</>}{" "}
          </button>
        </div>
      </div>
</div>
    </>
  );
}

export default VendorShowInfo;