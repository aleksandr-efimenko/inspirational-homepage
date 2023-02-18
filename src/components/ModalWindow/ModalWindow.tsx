import LocationSelect from '../LocationSelection/LocationSelect'
import './ModalWindow.css'
import { selectShowModal, showModalWindow } from '../../features/locationSelection/locationSelectionSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

export default function ModalWindow() {
  const dispatch = useAppDispatch();
  const showModal: boolean = useAppSelector(selectShowModal);

  return (
    <>{showModal &&
      <div className='modal'>
        <div className='overlay' onClick={() => dispatch(showModalWindow(false))}></div>
        <div className='modal-container'>
          <span className="close" onClick={() => dispatch(showModalWindow(false))}>&times;</span>
          <LocationSelect />
        </div>
      </div>}
    </>
  )
}
