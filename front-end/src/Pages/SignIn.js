import React from 'react'
import SignInForm from '../Components/SignInForm'

export default function SignIn({updateId}) {
    return (
        <div>
            <SignInForm updateId={updateId}/>
        </div>
    )
}
