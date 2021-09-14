import React from "react"
import { Link } from "react-router-dom"
import './SignInForm.css'

export default function SignInForm () {
    return (
        <div className="newForm">
        <form>
                <label htmlFor="Email"></label>
                <input 
                type="text" 
                value="" 
                placeholder="Email"
                /> <br/>
                
                <label htmlFor="Password"></label>
                <input 
                type="text" 
                value="" 
                placeholder="Password"
                /> <br/>
                <button type="button" className="Login">
                    Login
                    </button>
                <br/>

                <div className="divider"></div>
                <br/>
                <Link to="/SignUp">
                <button type="button">Sign Up</button>
                </Link>
            </form>
        </div>
    )
   
}