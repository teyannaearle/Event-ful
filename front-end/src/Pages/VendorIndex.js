import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import useGeoLocation from '../hooks/useGeoLocation'
import api from "../util/apiCalls"


export default function VendorIndex() {
    const [vendors , setVendors] = useState({})
    const { category } = useParams()
    const location = useGeoLocation()

    useEffect(()=>{
        (async () => {
            if (! location.error){
                const {longitude, latitude} = location.coordinates
                const data = await api.getVendorsLongLag(longitude,latitude,category);
                setVendors(data)
            } else {
                // EITHER PULL ZIP FROM EVENT OR ASK USER FOR ZIP --- STILL UNSURE 
                // const data = await api.getVendorsZip(category, zip)
                // setVendors(data)
            }
      
          })()
    }, [location])

    return (
        <div>
            <VendorList />
        </div>
    )
}
