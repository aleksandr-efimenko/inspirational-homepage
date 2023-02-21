import React, { MouseEvent } from 'react'

export default function LoginForm() {
    const handleCreateAccount = (e: MouseEvent) => {
        e.preventDefault();
    }
    return (
        <form className='login-form'>
            <h1>Login</h1>
            <label htmlFor=""><p>Email</p>
                <input className='white-text-input' autoFocus type='email'></input>
            </label>
            <label > <p>Password</p>
                <input className='white-text-input' type='password'></input>
            </label>
            <div id='sign-container'>
                <button className='white-button' type='submit'>Submit</button>
                <p><a href='/' onClick={handleCreateAccount} >Create account</a></p>
            </div>
        </form>
    )
}
