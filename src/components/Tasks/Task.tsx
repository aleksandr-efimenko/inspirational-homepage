import React from 'react'
import { Task } from '../../features/tasks/tasksSlice'

export default function TaskComponent({done, text}: Task) {
  const handleDeleteTask = () => {

  }
  return (
    <li className={done ? 'finished-task' : 'unfinished-task'}>
      <div className='task'>{text}</div>
    </li>
  )
}

