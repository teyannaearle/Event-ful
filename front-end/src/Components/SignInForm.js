import React from "react"
import { Link, Route } from "react-router-dom"
import SignUp from "../Pages/SignUp.js";
import './SignInForm.css'

export default function SignInForm () {
    return (
        <div className="newForm">
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
                <button type="button" className="Login">
                    Login
                    </button>
                <br/>

                <div className="divider"></div>
                <br/>
                {/* <Route path="/signup">
                    <Link>Click here
                    </Link>
                </Route> */}
                {/* <SignUp /> */}
                <Link to="/SignUp">
                <h4>Dont have an account? <br/>
                Click Here to get Started.
                </h4>
                </Link>

            </form>
        </div>
    )
   
}