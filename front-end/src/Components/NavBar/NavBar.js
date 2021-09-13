import React, { Component } from 'react'
import { VendorMenu } from './VendorMenu'
import {Link, useParams} from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {

    const {user_id} = useParams()


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
            cName:'nav-links'
        },
        
        ]



        return (
            <nav className="NavBarItems">
                <h1 className="navbar-logo">Event(ful)</h1>
                <div className="menu-icon">

                </div>
                <ul>
                    {VendorMenu.map((item, index) => {
                        return (
                        
                            <li key={index}>
                                <Link to={item.url} className={item.cName}>{item.title}</Link>
 
                                
                            </li>
                        )
                    })}

                </ul>
                <div>
                    {accountMenu.map((item,index) => {
                        return (
                            <li key={index}>
                                <Link to={item.url} className={item.cName}>{item.title}</Link>
                        
                                </li>
                        )
                    })}
                </div>
            </nav>
        )
    }

