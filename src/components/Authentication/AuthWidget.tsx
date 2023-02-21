import React from 'react';
import './Auth.css';
import { useAppDispatch } from '../../app/hooks';
import { openLoginForm } from '../../features/modalWindow/modalWindowSlice';

export default function AuthWidget() {
    const dispatch = useAppDispatch();
    
    const openAuthForm = () => {
        dispatch(openLoginForm());
    }
    return (
        <div className='auth-widget'>
            <button onClick={ openAuthForm } className='white-button'>Login</button>
        </div>
    )
}
