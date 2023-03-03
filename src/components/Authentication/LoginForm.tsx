import React, { FormEvent, MouseEvent, memo, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeModalWindow, openRegistrationForm, openResetPasswordForm } from '../../features/modalWindow/modalWindowSlice';
import { auth } from '../../app/firebase';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'

const testAccount = {
    email: 'test@test.com',
    password: 'test@test.com'
}

const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setValue(e.target.value);
    }

    const reset = () => {
        setValue(initialValue);
    }

    return { value, onChange, reset, setValue };
}

const LoginForm: React.FC = () => {
    const { reset: resetEmail, setValue: setEmail, ...emailProps } = useInput(testAccount.email);
    const { reset: resetPassword, setValue: setPassword, ...passwordProps } = useInput(testAccount.password);
    const [signIn, user, loading, errorAuth] = useSignInWithEmailAndPassword(auth);
    const dirty = useRef(false);
    const dispatch = useAppDispatch();

    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);

    const handleCreateAccountLink = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(openRegistrationForm());
    }

    const handleResetPasswordLink = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(openResetPasswordForm());
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        signIn(emailProps.value, passwordProps.value);
    }

    const handleInputFocus = () => {
        if (dirty.current) return;
        dirty.current = true;
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        if (user || userGoogle) {
            dispatch(closeModalWindow())
        }
    }, [dispatch, user, userGoogle]);

    const renderLoginButton = () => {
        if (loading) {
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

    const getErrorMessage = () => {
        if (errorAuth?.code.includes('user-not-found')) {
            return 'User not found';
        }
        return 'Error, try again'
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor=""><p>Email</p>
                <input {...emailProps} onFocus={handleInputFocus} className='white-text-input' type='email'></input>
            </label>
            <label > <p>Password</p>
                <input {...passwordProps} onFocus={handleInputFocus} className='white-text-input' type='password'></input>
            </label>
            {errorAuth && <p className='login-error-msg'>{getErrorMessage()}</p>}
            {errorGoogle && <p className='login-error-msg'>{errorGoogle.message}</p>}

            <div id='sign-container'>
                {renderLoginButton()}
                <p><a href='/' onClick={handleCreateAccountLink} >Create account</a></p>

            </div>
            <div id='sign-container'>
                <p>Forgot password? <a href='/' onClick={handleResetPasswordLink}>Reset</a></p>
            </div>

            {renderGoogleLoginButton()}

        </form>
    )
}

export default memo(LoginForm)