import React from 'react'
import { Task } from '../../features/tasks/tasksSlice'

export default function TaskComponent({done, text}: Task) {
  return (
    <li className={done ? 'finished-task' : 'unfinished-task'}>{text}</li>
  )
}

