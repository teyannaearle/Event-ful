import React from 'react'
import {userSignIn, userGoogleSignIn} from "../Services/Firebase.js"
import SignInForm from '../Components/SignInForm'

export default function SignIn() {
    return (
        <div>
          Please sign in to continue
            <SignInForm />
        </div>
    )
}
