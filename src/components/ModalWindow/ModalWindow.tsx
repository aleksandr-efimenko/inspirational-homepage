import React, { useState } from 'react'
import LocationSelect from '../LocationSelection/LocationSelect'
import './ModalWindow.css'

export default function ModalWindow() {
  const [modal, setModal] = useState(false);
  

  return (
    <>{modal &&
      <div className='modal'>
        <div className='modal-container'>
        <span className="close" onClick={() => setModal(false)}>&times;</span>
          <LocationSelect />
        </div>
      </div>}
    </>
    )
}
