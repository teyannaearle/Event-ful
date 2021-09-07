import React from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

export default function VendorIndex() {
    const location = useGeoLocation()
    return (
        <div>
            Vector Index Page
            {location.loaded ? JSON.stringify(location) : "not available"}
        </div>
    )
}
