import './Tasks.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Task, getTasksFromFirestoreAsync, initializeTasksFromLocalStorage, selectTasksState } from '../../features/tasks/tasksSlice';
import TaskComponent from './Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { auth } from '../../app/firebase';

export default function TaskList() {
  const taskList: Task[] = useAppSelector(selectTasksState).tasksList;
  const tasksStatus = useAppSelector(selectTasksState).LoadingTaskStatus;

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (auth.currentUser) {
      dispatch(getTasksFromFirestoreAsync());
    } else {
      dispatch(initializeTasksFromLocalStorage());
    }
  }, [dispatch])
  const renderTaskList = () => {
    if (tasksStatus === 'idle') {
      return <ul>
        {
          taskList.map((el) => {
            return <TaskComponent
              bgColor={el.bgColor}
              dateAdd={el.dateAdd}
              done={el.done}
              text={el.text}
              id={el.id}
              key={el.id} />
          })
        }
      </ul>
    } else if (tasksStatus === 'loading') {
      return <p><FontAwesomeIcon className='spinner' size={'2x'} icon={['fas', 'circle-notch']} /></p>
    } else {
      return <p>No tasks</p>
    }
  }
  return (
    <div className='task-list'>
      {renderTaskList()}
    </div >
  )
}