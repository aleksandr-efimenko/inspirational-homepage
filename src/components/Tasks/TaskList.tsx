import './Tasks.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TaskComponent from './Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { auth, db } from '../../app/firebase';
import { query, collection, where, DocumentData } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Task, initializeTasksFromLocalStorage, selectTasksState } from '../../features/tasks/tasksSlice';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function TaskList() {
  const localTaskList: Task[] = useAppSelector(selectTasksState).tasksList;
  const dispatch = useAppDispatch();

  const TASKS_COLLECTION = "tasks";
  const [user] = useAuthState(auth);
  const receiptsQuery = query(collection(db, TASKS_COLLECTION), where("uid", "==", user?.uid || '-'));
  const [taskDocList, loading, error] = useCollectionData(receiptsQuery);

  useEffect(() => {
    if (!user) {
      dispatch(initializeTasksFromLocalStorage());
    }
  }, [user, dispatch])

  const renderTasks = () => {
    if (!user) {
      return renderTaskList(localTaskList);
    }

    if (loading) {
      return <p><FontAwesomeIcon className='spinner' size={'2x'} icon={['fas', 'circle-notch']} /></p>
    } else if (error) {
      return <p>Error loading</p>
    } else if (taskDocList) {
      return renderTaskList(taskDocList);
    }
    else {
      return <p>No tasks</p>
    }
  }

  const renderTaskList = (taskList: Task[] | DocumentData[]) => {
    return <ul>
      {
        taskList?.map((el) => {
          return <TaskComponent
            bgColor={el.bgColor}
            done={el.done}
            text={el.text}
            id={el.id}
            key={el.id} />
        })
      }
    </ul>
  }
  return (
    <div className='task-list'>
      {renderTasks()}
    </div >
  )
}

