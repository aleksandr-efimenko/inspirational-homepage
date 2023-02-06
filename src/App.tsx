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

library.add(faChevronLeft, faChevronRight);

function App() {
  const dispatch = useAppDispatch();
  const bgLocalUrl = useAppSelector(selectBackgroundLocal);
  const bgUnsplashUrl = useAppSelector(selectBackgroundUnsplash);
  const bgUnsplashStatus = useAppSelector(selectBackgroundUnsplashStatus);
  const bgNeedLoad = useAppSelector(selectBackgroundUnsplashNeedNewLoad);


  const handlePrevBg = () => {
    // dispatch(getPreviousBgLocal());
    dispatch(getRandomQuoteAsync());
    dispatch(getPreviousBgUnsplash());
  }

  const handleNextBg = () => {
    // dispatch(getNextBgLocal());
    dispatch(getRandomQuoteAsync());
    dispatch(getNextBgUnsplash());
    console.log(bgNeedLoad);
    if (bgNeedLoad)
      dispatch(getRandomImageAsync());
  }

  useEffect(() => {
    dispatch(getRandomImageAsync());
  }, [dispatch])


  return (
    <div className="App" style={{ backgroundImage: `url(${bgUnsplashUrl})` }}>
      <Weather />
      <div className='slide-btn-container-left'>
        <FontAwesomeIcon onClick={handlePrevBg} className='slide-btn ' size={'2x'} icon={['fas', 'chevron-left']} />
      </div>
      <div className='slide-btn-container-right'>
        <FontAwesomeIcon onClick={handleNextBg} className='slide-btn ' size={'2x'} icon={['fas', 'chevron-right']} />
      </div>
      <Quote />
    </div >
  );
}

export default App;
