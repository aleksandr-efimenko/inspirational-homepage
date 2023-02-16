import React from 'react'
import LocationSelect from '../LocationSelection/LocationSelect'
import './ModalWindow.css'

export default function ModalWindow() {
  return (
    <div className='modal'>
        <div className='modal-container'>
          <LocationSelect />
        </div>
    </div>
  )
}
