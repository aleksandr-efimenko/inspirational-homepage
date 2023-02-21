import React, { MouseEvent, useEffect, useRef, useState } from 'react'

const testAccount = {
    email: 'test@test.com',
    password: 'test@test.com'
}

export default function LoginForm() {
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [useDefaultValues, setUseDefaultValues] = useState(true);

    const handleCreateAccount = (e: MouseEvent) => {
        e.preventDefault();
    }

    const handleInputFocus = () => {
        if (useDefaultValues) {
            setUseDefaultValues(false);
            if (emailInput.current)
                emailInput.current.value = '';
            if (passwordInput.current)
                passwordInput.current.value = '';
        }
    }

    useEffect(() => {
        if (useDefaultValues) {
            if (emailInput.current)
                emailInput.current.value = testAccount.email;
            if (passwordInput.current)
                passwordInput.current.value = testAccount.password;
        }
    }, [])

    return (
        <form className='login-form'>
            <h1>Login</h1>
            <label htmlFor=""><p>Email</p>
                <input ref={emailInput} onFocus={handleInputFocus} className='white-text-input' type='email'></input>
            </label>
            <label > <p>Password</p>
                <input ref={passwordInput} onFocus={handleInputFocus} className='white-text-input' type='password'></input>
            </label>
            <div id='sign-container'>
                <button className='white-button' type='submit'>Submit</button>
                <p><a href='/' onClick={handleCreateAccount} >Create account</a></p>
            </div>
        </form>
    )
}
