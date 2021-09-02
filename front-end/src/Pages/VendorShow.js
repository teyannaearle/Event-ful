import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import api from '../util/apiCalls'

export default function VendorShow() {
    const [business, setbusiness] = useState({
        name:"",
           photos:"",
           price:"",
           hours:"",         
url:"",
display_phone:"",
categories:"",
rating:"",
location:""
    })

    const {provider_id} = useParams()
    
    useEffect(()=>{
(async ()=>{
const data = await api.getVendor(provider_id)
// setbusiness(data)
setbusiness({name:data.name,
photos:data.photos,
price:data.price,
hours:data.hours,
url:data.url,
display_phone:data.display_phone,
categories:data.categories,
rating:data.rating,
location:data.location,})

})() },[])

    return (
        <div>
            Vendor Show Page
            {/* {business.photos.map(photo =><img src={photo}/>)} */}
            {/* name
           photos(there's multiple)
           price
           hours
            
url
display_phone
categories.title(there are multiple)
rating
location.display_address */}
        </div>
    )
}
