import React, { FormEvent, MouseEvent, useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openLoginForm } from '../../features/modalWindow/modalWindowSlice';
import { useAppDispatch } from '../../app/hooks';

export default function ResetPasswordForm() {
    const [sendPasswordResetEmail, sendingReset, errorReset] = useSendPasswordResetEmail(
        auth
    );
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendPasswordResetEmail(email);
    }

    const renderResetButton = () => {
        if (sendingReset) {
            return <p><FontAwesomeIcon className='spinner' size={'2x'} icon={['fas', 'circle-notch']} /></p>
        } else {
            return (
                <button className='white-button' type='submit'>Submit</button>
            )
        }
    }

    const handleLoginLink = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(openLoginForm());
    }
    
    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Reset password</h1>
            <label htmlFor=""><p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} className='white-text-input' type='email'></input>
            </label>
            {errorReset && <p className='login-error-msg'>{errorReset.message}</p>}
            <div id='sign-container'>
                {renderResetButton()}
                <p><a href='/' onClick={handleLoginLink}>Login</a></p>
            </div>
        </form >
    )
}
