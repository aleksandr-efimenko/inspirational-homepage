import React from 'react';
import './App.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faChevronLeft, faChevronRight);


function App() {
  return (
    <div className="App">
      <FontAwesomeIcon className='slide-btn' size={'5x'} icon={['fas', 'chevron-left']} />
      <FontAwesomeIcon className='slide-btn' size={'5x'} icon={['fas', 'chevron-right']} />
    </div>
  );
}

export default App;
