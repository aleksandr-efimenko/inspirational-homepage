import React from 'react';
import './Tasks.css';
import { useAppSelector } from '../../app/hooks';
import { Task, selectTaskList } from '../../features/tasks/tasksSlice';
import TaskComponent from './Task';

export default function TaskList() {
  const taskList: Task[] = useAppSelector(selectTaskList);

  return (
    <div className='task-list'>
      <ul>
        {
          taskList.map((el) => {
            return <TaskComponent
              done={el.done}
              text={el.text}
              id={el.id} 
              key={el.id} />
          })
        }
      </ul>
    </div >
  )
}
