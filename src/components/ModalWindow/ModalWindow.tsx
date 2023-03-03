// import LocationSelect from '../LocationSelection/LocationSelect'
import './ModalWindow.css'
import { selectShowModal, selectModalContent, closeModalWindow } from '../../features/modalWindow/modalWindowSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import LoginForm from '../Authentication/LoginForm';
import RegistrationForm from '../Authentication/RegistrationForm';
import ResetPasswordForm from '../Authentication/ResetPasswordForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Suspense } from 'react';

export default function ModalWindow() {
  const LocationSelect = React.lazy(() => import('../LocationSelection/LocationSelect'));

  const dispatch = useAppDispatch();
  const showModal: boolean = useAppSelector(selectShowModal);
  const modalWindowContent = useAppSelector(selectModalContent);

  const renderModalContent = () => {
    switch (modalWindowContent) {
      case 'LoginForm':
        return <LoginForm />;
      case 'locationSelect':
        return (<Suspense fallback={<FontAwesomeIcon className='spinner' size={'2x'} icon={['fas', 'circle-notch']} />}>
          <LocationSelect />
        </Suspense>);
      case 'RegistrationForm':
        return <RegistrationForm />;
      case 'ResetPasswordForm':
        return <ResetPasswordForm />;
      default:
        return <></>
    }
  }

  return (
    <>{showModal &&
      <div className='modal'>
        <div className='overlay' onClick={() => dispatch(closeModalWindow())}></div>
        <div className='modal-container'>
          <span className="close" onClick={() => dispatch(closeModalWindow())}>&times;</span>
          {renderModalContent()}
        </div>
      </div>}
    </>
  )
}
