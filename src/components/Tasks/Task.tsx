import React from 'react'
import { Task } from '../../features/tasks/tasksSlice'

export default function TaskComponent({ done, text, bgColor }: Task) {
  const handleDeleteTask = () => {

  }


  return (
    <li className={done ? 'finished-task' : 'unfinished-task'}>
      <div className='task' style={{ backgroundColor: bgColor }}>
        <div className='task-action-container'>
          <button className='remove'>Remove</button>
          <button className='done'>Done</button>
        </div>
        <p>{text}</p>
      </div>
    </li>
  )
}

