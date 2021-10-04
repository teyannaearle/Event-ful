import React from "react"
import { Link } from "react-router-dom"
import './SignInForm.css'

export default function SignInForm () {
    return (
        <div className="eventpage-container three-d"> 
            <h3>Sign In Here To Get Started</h3>
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
                <button type="button" className="pg-buttons">
                    Login
                    </button>
                <br/>

                <div className="divider"></div>
                <br/>
            
                <Link to="/SignUp">
                <h4>Dont have an account? <br/>
                Click Here to make one!
                </h4>
                </Link>

            </form>
        </div>
    )
   
}