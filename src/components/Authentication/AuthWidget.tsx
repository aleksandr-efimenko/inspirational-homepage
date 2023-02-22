import React, { MouseEvent } from 'react';
import './Auth.css';
import { useAppDispatch } from '../../app/hooks';
import { openLoginForm } from '../../features/modalWindow/modalWindowSlice';
import { auth } from '../../app/firebase';

export default function AuthWidget() {
    const dispatch = useAppDispatch();

    const openAuthForm = () => {
        dispatch(openLoginForm());
    }

    const handleLogout = (e: MouseEvent) => {
        e.preventDefault();

    }

    const renderAuthWidget = () => {
        if (auth.currentUser) {
            return (<>
                <p>{auth.currentUser?.displayName ?? auth.currentUser?.email}</p>
                <p><a href='/' onClick={handleLogout} >Logout</a></p>
            </>)

        } else {
            return <button onClick={openAuthForm} className='white-button'>Login</button>
        }
    }

    return (
        <div className='auth-widget'>
            {renderAuthWidget()}
        </div>
    )
}
