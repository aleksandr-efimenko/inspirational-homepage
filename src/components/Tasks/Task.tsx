import React from 'react'
import { Task } from '../../features/tasks/tasksSlice'

export default function TaskComponent({ done, text, bgColor }: Task) {
  const handleDeleteTask = () => {

  }


  return (
    <li className={done ? 'finished-task' : 'unfinished-task'}>
      <div className='task' style={{ backgroundColor: bgColor }}>
        <p>{text}</p>
      </div>
    </li>
  )
}

