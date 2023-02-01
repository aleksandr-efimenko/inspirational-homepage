import './App.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getNextBg, getPreviousBg, selectBackground } from './features/background/backgroundSclice';
import Weather from './features/weather/Weather';
import Quote from './features/quotes/Quote';

library.add(faChevronLeft, faChevronRight);


function App() {
  const dispatch = useAppDispatch();
  const bgUrl = useAppSelector(selectBackground);

  const handlePrevBg = () => {
    dispatch(getPreviousBg());
  }

  const handleNextBg = () => {
    dispatch(getNextBg());
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${bgUrl})` }}>
      <Weather />
      <div className='slide-btn-container-left'>
        <FontAwesomeIcon onClick={handlePrevBg} className='slide-btn ' size={'5x'} icon={['fas', 'chevron-left']} />
      </div>
      <div className='slide-btn-container-right'>
        <FontAwesomeIcon onClick={handleNextBg} className='slide-btn ' size={'5x'} icon={['fas', 'chevron-right']} />
      </div>
      <Quote />
    </div >
  );
}

export default App;
