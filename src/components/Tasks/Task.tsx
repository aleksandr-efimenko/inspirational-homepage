import React from 'react'
import { Task } from '../../features/tasks/tasksSlice'

export default function TaskComponent({text, done}:Task) {
  return (
    <div className='task'>
        <p>{text}</p>
    </div>
  )
}
