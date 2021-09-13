import React from 'react'
import loading from "../assets/loading.gif"

function Loading() {
    return (
        <div className="loading">
           <img src={loading} alt="loading" width="300px" />
        </div>
    )
}

export default Loading
