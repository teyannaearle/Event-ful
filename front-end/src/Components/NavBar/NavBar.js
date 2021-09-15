import React, { Component, useState } from 'react'
import { VendorMenu } from './VendorMenu'
import {Link, useParams} from 'react-router-dom'
import './NavBar.css'
import {Button} from './Button'

export default function NavBar() {

    const {user_id} = useParams()
    const [vendorClicked, setVendorClicked] = useState(false)
    const [accountClicked, setAccountClicked] = useState(false)


    const handleAccountClick = () => {
        setAccountClicked(!accountClicked)

    }

    const handleVendorClick = () => {
        setVendorClicked(!vendorClicked)

    }


    const accountMenu = [
        {
            title:'Dashboard',
            url:`/dashboard/${user_id}`,
            cName:'nav-links'
        },
        {
            title:'My Favorites',
            url:`/favorites/${user_id}`,
            cName:'nav-links'
        },
        {
            title:'Settings',
            url:`/settings/${user_id}`,
            cName:'nav-links'
        },
        {
            title:'Logout',
            url:'/logo',
            cName:'nav-links-mobile'
        },
        
        
        ]



        return (
            <nav className="NavBarItems">
                <h1 className="navbar-logo">Event(ful)<i className="fab fa-react"></i></h1>
                <div className="menu-icon" onClick={handleVendorClick}>
                    <i className={vendorClicked ? 'fas fa-times' : 'fas fa-bars'}></i>

                </div>
                <ul className={vendorClicked ? 'nav-menu active' : 'nav-menu'}>
                    {VendorMenu.map((item, index) => {
                        return (
                        
                            <li key={index}>
                                <Link to={item.url} className={item.cName}>{item.title}</Link>
 
                                
                            </li>
                        )
                    })}

                </ul>
                {/* <div className="menu-icon" onClick={handleAccountClick}>
                    <i className={accountClicked ? 'fas fa-times' : 'fas fa-bars'}></i>

                </div>
            
                <ul className={accountClicked ? 'nav-menu active' : 'nav-menu'}>
                
                    {accountMenu.map((item,index) => {
                        return (
                            <li key={index}>
                                <Link to={item.url} className={item.cName}>{item.title}</Link>
                        
                                </li>
                        )
                    })}
                </ul> */}
                <Button>Logout</Button>
    
            </nav>
        )
    }

