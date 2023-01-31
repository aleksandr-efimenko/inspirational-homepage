import React, { useState } from 'react';
import './App.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faChevronLeft, faChevronRight);


function App() {
  const [bgUrl, setBgUrl] = useState('');

  const appStyle = {
    backgroundImage: bgUrl
  }

  return (
    <div className="App" style={appStyle}>
      <div className='slide-btn-container-left'>
        <FontAwesomeIcon className='slide-btn ' size={'5x'} icon={['fas', 'chevron-left']} />
      </div>
      <div className='slide-btn-container-right'>
        <FontAwesomeIcon className='slide-btn ' size={'5x'} icon={['fas', 'chevron-right']} />
      </div>
    </div >
  );
}

export default App;
