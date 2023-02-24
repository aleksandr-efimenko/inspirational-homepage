import React, { FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeModalWindow } from '../../features/modalWindow/modalWindowSlice';
import { useAppDispatch } from '../../app/hooks';

export default function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
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
        if (password === confirmPassword)
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

    useEffect(() => {
        if (user) {
            dispatch(closeModalWindow())
        }
    })
    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Create account</h1>
            <label htmlFor=""><p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} className='white-text-input' type='email'></input>
            </label>
            <div className='login'><label > <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} className='white-text-input' type='password'></input>
            </label>
                <label > <p>Confirm password</p>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className='white-text-input' type='password'></input>
                </label>
            </div>
            {errorRegister && <p className='login-error-msg'>{errorRegister.message}</p>}


            <div id='sign-container'>
                {renderRegisterButton()}
                <p><a href='/' onClick={handleLoginLink} >Login</a></p>
            </div>
        </form>
    )
}
