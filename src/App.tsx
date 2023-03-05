import './App.css';
import { faCheck, faChevronLeft, faChevronRight, faCircleNotch, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getNextBgLocal, getPreviousBgLocal } from './features/background/backgroundLocalSclice';
import { getNextBgUnsplash, getPreviousBgUnsplash, getRandomImageAsync, selectBackgroundUnsplashNeedNewLoad, selectBackgroundUnsplashStatus } from './features/background/backgroundUnsplashSlice';
import Weather from './features/weather/Weather';
import Quote from './components/Quote';
import { getNextQuote, getPreviousQuote, getRandomQuoteAsync, selectQuoteNeedsNewLoad } from './features/quotes/quoteSlice';
import TaskForm from './components/Tasks/TaskForm';
import TaskList from './components/Tasks/TaskList';
import Background from './components/Background';
import AuthWidget from './components/Authentication/AuthWidget';
import React from 'react';
import ModalWindow from './components/ModalWindow/ModalWindow';

library.add(faChevronLeft, faChevronRight, faCircleNotch, faCheck, faPenToSquare, faTrash);

function App() {
  const dispatch = useAppDispatch();
  const bgUnsplashStatus = useAppSelector(selectBackgroundUnsplashStatus);
  //If user currently on the last image from array load next array of image sources
  const bgNeedLoad = useAppSelector(selectBackgroundUnsplashNeedNewLoad);

  const quoteNeesLoad = useAppSelector(selectQuoteNeedsNewLoad);

  const handlePrevBgAndQuote = () => {
    dispatch(getPreviousQuote());
    dispatch(getPreviousBgUnsplash());
    if (bgUnsplashStatus === 'failed') {
      dispatch(getPreviousBgLocal());
    }
  }

  const handleNextBgAndQuote = () => {
    dispatch(getNextBgUnsplash());
    dispatch(getNextQuote());
    if (quoteNeesLoad)
      dispatch(getRandomQuoteAsync());

    if (bgNeedLoad)
      dispatch(getRandomImageAsync());
    if (bgUnsplashStatus === 'failed') {
      dispatch(getNextBgLocal());
    }
  }

  return (
    <div className="App" >
      <Background />
      <AuthWidget />
      <ModalWindow />
      <Weather />
      <div className='slide-btn-container-left'>
        <FontAwesomeIcon onClick={handlePrevBgAndQuote} className='slide-btn ' size={'2x'} icon={['fas', 'chevron-left']} />
      </div>
      <TaskForm />
      <TaskList />
      <div className='slide-btn-container-right'>
        <FontAwesomeIcon onClick={handleNextBgAndQuote} className='slide-btn ' size={'2x'} icon={['fas', 'chevron-right']} />
      </div>
      <Quote />
    </div >
  );
}

export default App;
