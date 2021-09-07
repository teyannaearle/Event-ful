import React, { useState, useEffect } from 'react'

function useGeoLocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coord: { lat: "" , long: ""}
    })

    const onSuccess = (location) => {
        setLocation({
            loaded:true,
            coordinates:{
                lat: location.coords.latitude,
                long: location.coords.longitude,
            }
        })
    }

    const onError = (error) => {
        setLocation({
            loaded:true,
            error
        })
    }

    useEffect(()=>{
        if (!("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation not supported"
            })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])

    return location
}

export default useGeoLocation
