import React from 'react'
import { Task } from '../../features/tasks/tasksSlice'

export default function TaskComponent({text, done, id}:Task) {
  return (
    <div className='task'>
        <li key={id} className={done ? 'finished-task' : 'unfinished-task'}>{text}</li>
    </div>
  )
}
