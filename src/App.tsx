import './App.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getNextBgLocal, getPreviousBgLocal } from './features/background/backgroundLocalSclice';
import { getNextBgUnsplash, getPreviousBgUnsplash, getRandomImageAsync, selectBackgroundUnsplashNeedNewLoad, selectBackgroundUnsplashStatus } from './features/background/backgroundUnsplashSlice';
import Weather from './features/weather/Weather';
import Quote from './features/quotes/Quote';
import { getRandomQuoteAsync } from './features/quotes/quoteSlice';
import TaskForm from './components/Tasks/TaskForm';
import TaskList from './components/Tasks/TaskList';
import Background from './components/Background';

library.add(faChevronLeft, faChevronRight);

function App() {
  const dispatch = useAppDispatch();
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

  return (
    <div className="App" >
      <Background />
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
