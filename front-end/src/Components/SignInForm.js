import React from "react"
import { Link } from "react-router-dom"

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
                <button type="button">
                    Login
                    </button>
                
                <h4> Or Sign up Here</h4>
                <Link to="/SignUp">
                <button>Sign Up</button>
                </Link>
            </form>
        </div>
    )
   
}