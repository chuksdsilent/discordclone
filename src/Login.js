import { Button } from '@material-ui/core'
import React from 'react'
import './login.css'
import { auth, provider } from './Firebase';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.messsage))
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img alt="logo" src="data:image/png;base64,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" />
            </div>
            <Button onClick={signIn}>Sign In</Button>

        </div>
    )
}

export default Login
