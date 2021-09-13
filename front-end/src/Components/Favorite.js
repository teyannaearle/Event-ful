import React from 'react'

export default function Favorite({vendor}) {
    return (
       
         <tr>
             <td>{vendor.name}</td>
             <td>{vendor.address}</td>
             <td>{vendor.phone}</td>
         </tr>
      
    )
}
