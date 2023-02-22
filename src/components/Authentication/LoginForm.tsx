import React, { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { authorizeAsync, selectAuthStatus } from '../../features/authentication/authenticationSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { closeModalWindow } from '../../features/modalWindow/modalWindowSlice';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../app/firebase';

library.add(faCircleNotch);

const testAccount = {
    email: 'test@test.com',
    password: 'test@test.com'
}

export default function LoginForm() {
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [useDefaultValues, setUseDefaultValues] = useState(true);
    const dispatch = useAppDispatch();

    const handleCreateAccount = (e: MouseEvent) => {
        e.preventDefault();
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (emailInput.current && passwordInput.current) {
            dispatch(authorizeAsync({
                email: emailInput.current.value,
                password: passwordInput.current.value,
            }))
        }

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
    }, [useDefaultValues])

    const userState = useAppSelector(selectAuthStatus);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                dispatch(closeModalWindow())
            }
            console.log(firebaseUser)
        });

        return unsubscribe;
    }, []);

    const renderLoginButton = () => {
        if (userState.status === 'loading') {
            return <FontAwesomeIcon className='spinner' size={'1x'} icon={['fas', 'circle-notch']} />
        } else {
            return (
                <button className='white-button' type='submit'>Submit</button>
            )
        }
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor=""><p>Email</p>
                <input ref={emailInput} onFocus={handleInputFocus} className='white-text-input' type='email'></input>
            </label>
            <label > <p>Password</p>
                <input ref={passwordInput} onFocus={handleInputFocus} className='white-text-input' type='password'></input>
            </label>
            {userState.errorMessage ? <p>{userState.errorMessage}</p> : <></>}
            <div id='sign-container'>
                {renderLoginButton()}
                <p><a href='/' onClick={handleCreateAccount} >Create account</a></p>
            </div>
        </form>
    )
}
