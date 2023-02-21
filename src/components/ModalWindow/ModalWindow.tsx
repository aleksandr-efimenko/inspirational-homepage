import LocationSelect from '../LocationSelection/LocationSelect'
import './ModalWindow.css'
import { selectShowModal, openLocationSelect } from '../../features/modalWindow/modalWindow';
import { useAppDispatch, useAppSelector } from '../../app/hooks'

export default function ModalWindow() {
  const dispatch = useAppDispatch();
  const showModal: boolean = useAppSelector(selectShowModal);

  return (
    <>{showModal &&
      <div className='modal'>
        <div className='overlay' onClick={() => dispatch(openLocationSelect())}></div>
        <div className='modal-container'>
          <span className="close" onClick={() => dispatch(openLocationSelect())}>&times;</span>
          <LocationSelect />
        </div>
      </div>}
    </>
  )
}
