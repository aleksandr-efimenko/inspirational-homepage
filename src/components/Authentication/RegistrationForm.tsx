import React, { FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeModalWindow, openLoginForm, openResetPasswordForm } from '../../features/modalWindow/modalWindowSlice';
import { useAppDispatch } from '../../app/hooks';

export default function RegistrationForm() {
    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorEnter, seterrorEnter] = useState('');

    const dispatch = useAppDispatch();
    const [
        createUserWithEmailAndPassword,
        user,
        loadingRegister,
        errorRegister,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const handleLoginLink = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(openLoginForm());
    }

    const handleResetPasswordLink = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(openResetPasswordForm());
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword)
            createUserWithEmailAndPassword(email, password);
        else {
            seterrorEnter('Passwords do not match');
        }

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

    const renderGoogleLoginButton = () => {
        if (loadingGoogle) {
            return <p><FontAwesomeIcon className='spinner' size={'2x'} icon={['fas', 'circle-notch']} /></p>
        } else {
            return (
                <div onClick={() => signInWithGoogle()} id="googleBtn" className="customGPlusSignIn">
                    <span className="google-icon"></span>
                    <span className="google-buttonText">Google</span>
                </div>
            )
        }
    }

    useEffect(() => {
        if (user || userGoogle) {
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
                <input onChange={(e) => {
                    seterrorEnter('');
                    setPassword(e.target.value)
                }} className='white-text-input' type='password'></input>
            </label>
                <label > <p>Confirm password</p>
                    <input onChange={(e) => {
                        seterrorEnter('');
                        setConfirmPassword(e.target.value)
                    }} className='white-text-input' type='password'></input>
                </label>
            </div>
            {errorRegister && <p className='login-error-msg'>{errorRegister.message}</p>}
            {errorEnter && <p className='login-error-msg'>{errorEnter}</p>}
            {errorGoogle && <p className='login-error-msg'>{errorGoogle.message}</p>}

            <div id='sign-container'>
                {renderRegisterButton()}
                <p><a href='/' onClick={handleLoginLink} >Login</a></p>
            </div>
            <div id='sign-container'>
                <p>Forgot password? <a href='/' onClick={handleResetPasswordLink}>Reset</a></p>
            </div>

            {renderGoogleLoginButton()}

        </form >
    )
}
