import './App.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getNextBgLocal, getPreviousBgLocal, selectBackgroundLocal } from './features/background/backgroundLocalSclice';
import { getNextBgUnsplash, getPreviousBgUnsplash, getRandomImageAsync, selectBackgroundUnsplash, selectBackgroundUnsplashNeedNewLoad, selectBackgroundUnsplashStatus } from './features/background/backgroundUnsplashSlice';
import Weather from './features/weather/Weather';
import Quote from './features/quotes/Quote';
import { getRandomQuoteAsync } from './features/quotes/quoteSlice';
import { useEffect } from 'react';
import TaskForm from './components/Tasks/TaskForm';
import TaskList from './components/Tasks/TaskList';

library.add(faChevronLeft, faChevronRight);

function App() {
  const dispatch = useAppDispatch();
  const bgLocalUrl = useAppSelector(selectBackgroundLocal);
  const bgUnsplashUrl = useAppSelector(selectBackgroundUnsplash);
  const bgUnsplashStatus = useAppSelector(selectBackgroundUnsplashStatus);
  const bgNeedLoad = useAppSelector(selectBackgroundUnsplashNeedNewLoad);

  const handlePrevBg = () => {
    dispatch(getRandomQuoteAsync());
    dispatch(getPreviousBgUnsplash());
    if (bgUnsplashStatus === 'failed') {
      dispatch(getPreviousBgLocal());
    }
  }

  const handleNextBg = () => {
    dispatch(getRandomQuoteAsync());
    dispatch(getNextBgUnsplash());
    if (bgNeedLoad)
      dispatch(getRandomImageAsync());
    if (bgUnsplashStatus === 'failed') {
      dispatch(getNextBgLocal());
    }
  }

  useEffect(() => {
    dispatch(getRandomImageAsync());
  }, [dispatch])

  return (
    <div className="App" >
      <div id='background-image-container' style={{ backgroundImage: `url(${bgUnsplashStatus === 'failed' ? bgLocalUrl : bgUnsplashUrl})` }}></div>
      <Weather />
      <div className='slide-btn-container-left'>
        <FontAwesomeIcon onClick={handlePrevBg} className='slide-btn ' size={'2x'} icon={['fas', 'chevron-left']} />
      </div>
      <TaskForm />
      <TaskList />
      <div className='slide-btn-container-right'>
        <FontAwesomeIcon onClick={handleNextBg} className='slide-btn ' size={'2x'} icon={['fas', 'chevron-right']} />
      </div>
      <Quote />
    </div >
  );
}

export default App;
