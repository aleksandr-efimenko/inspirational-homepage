import React from 'react'
import { Task, removeTaskAsync, removeTaskLocal, setTaskDoneAsync, setTaskDoneLocal } from '../../features/tasks/tasksSlice'
import { useAppDispatch } from '../../app/hooks'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';

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

  return (
    <li className={done ? 'finished-task' : ''}>
      <div className='task' style={{ backgroundColor: bgColor }}>
        <div className='task-action-container'>
          <button onClick={() => handleDeleteTask(id)} className='remove'>Remove</button>
          <button onClick={() => handleDoneTask(id)} className='done'>Done</button>
        </div>
        <p>{text}</p>
      </div>
    </li>
  )
}

