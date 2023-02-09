import React from 'react'
import { Task, removeTask, setTaskDone } from '../../features/tasks/tasksSlice'
import { useAppDispatch } from '../../app/hooks'

export default function TaskComponent({ done, text, bgColor, id }: Task) {
  const dispatch = useAppDispatch();

  const handleDeleteTask = (id: string) => {
    dispatch(removeTask(id));
  }

  const handleDoneTask = (id: string) => {
    dispatch(setTaskDone(id));
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

