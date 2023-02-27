import React, { MouseEvent } from 'react';
import './Auth.css';
import { useAppDispatch } from '../../app/hooks';
import { openLoginForm } from '../../features/modalWindow/modalWindowSlice';
import { auth } from '../../app/firebase';
import { useAuthState, useSignOut} from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { initializeTasksFromLocalStorage } from '../../features/tasks/tasksSlice';

export default function AuthWidget() {
    const dispatch = useAppDispatch();
    const [user, loadingUser] = useAuthState(auth)
    const [signOut, loadingSignOut] = useSignOut(auth);
    const loading = loadingUser || loadingSignOut;

    const openAuthForm = () => {
        dispatch(openLoginForm());
    }

    const handleLogout = (e: MouseEvent) => {
        e.preventDefault();
        signOut();
        dispatch(initializeTasksFromLocalStorage());
    }

    if (loading) {
        return <p><FontAwesomeIcon className='spinner' size={'2x'} icon={['fas', 'circle-notch']} /></p>
    }

    const renderAuthWidget = () => {
        if (user) {
            return (<>
                <p>{user?.displayName ?? user?.email}</p>
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

