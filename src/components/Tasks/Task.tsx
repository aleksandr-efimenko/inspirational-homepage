import React from 'react'
import { Task, removeTaskAsync, removeTaskLocal, setTaskDoneAsync, setTaskDoneLocal, setTaskForEdit, setTaskIDForEditFromFirestore } from '../../features/tasks/tasksSlice'
import { useAppDispatch } from '../../app/hooks'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TaskComponent({ done, text, bgColor, id }: Task) {
  const [user] = useAuthState(auth);

  const dispatch = useAppDispatch();

  const handleDeleteTask = (id: string) => {
    if (user)
      dispatch(removeTaskAsync(id));
    else
      dispatch(removeTaskLocal(id));
  }

  const handleDoneTask = (id: string) => {
    if (user)
      dispatch(setTaskDoneAsync(id));
    else
      dispatch(setTaskDoneLocal(id));
  }

  const handleEditTask = (id: string) => {
    if (user)
      dispatch(setTaskIDForEditFromFirestore(id));
    else
      dispatch(setTaskForEdit(id));
  }

  return (
    <li className={done ? 'finished-task' : ''}>
      
      <div className='task' style={{ backgroundColor: bgColor }}>
        <p>{text}</p>
        <div className='task-action-container'>
          <button onClick={() => handleDoneTask(id)} className='done'>Done</button>
          <button onClick={() => handleEditTask(id)} className='edit'>Edit</button>
        </div>
        <div className='task-action-container-remove'>
          <button onClick={() => handleDeleteTask(id)} className='remove'>Remove</button>
        </div>

        <div className='task-action-container-small'>
          <button onClick={() => handleDoneTask(id)} className='done'>
            <FontAwesomeIcon className='check' size='2x' icon={['fas', 'check']} />
          </button>
          <button onClick={() => handleEditTask(id)} className='edit'>
            <FontAwesomeIcon className='pen-to-square' size='2x' icon={['fas', 'pen-to-square']} />
          </button>
          <button onClick={() => handleDeleteTask(id)} className='remove'>
            <FontAwesomeIcon className='trash' size='2x' icon={['fas', 'trash']} />
          </button>
        </div>
      </div>
    </li>
  )
}

