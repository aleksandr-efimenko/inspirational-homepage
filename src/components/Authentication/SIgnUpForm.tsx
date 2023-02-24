import React, { FormEvent, MouseEvent, useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SIgnUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loadingRegister,
        errorRegister,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleLoginLink = (e: MouseEvent) => {
        e.preventDefault();

    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);
    }

    const renderRegisterButton = () => {
        if (loadingRegister) {
            return <p><FontAwesomeIcon className='spinner' size={'2x'} icon={['fas', 'circle-notch']} /></p>
        } else {
            return (
                <button className='white-button' type='submit'>Submit</button>
            )
        }
    }
    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor=""><p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} className='white-text-input' type='email'></input>
            </label>
            <label > <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} className='white-text-input' type='password'></input>
            </label>
            {errorRegister && <p className='login-error-msg'>{errorRegister.message}</p>}
            <div id='sign-container'>
                {renderRegisterButton()}
                <p><a href='/' onClick={handleLoginLink} >Login</a></p>
            </div>
        </form>
    )
}
