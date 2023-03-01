import './Tasks.css';
import { useAppSelector } from '../../app/hooks';
import TaskComponent from './Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { auth, db } from '../../app/firebase';
import { query, collection, where, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Task, selectTasksState } from '../../features/tasks/tasksSlice';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function TaskList() {
  const localTaskList: Task[] = useAppSelector(selectTasksState).tasksList;

  const TASKS_COLLECTION = "tasks";
  const [user] = useAuthState(auth);
  const receiptsQuery = query(collection(db, TASKS_COLLECTION), where("uid", "==", user?.uid || '-'));
  const [taskDocList, loading, error] = useCollectionData(receiptsQuery);

  const taskList = user ? taskDocList : localTaskList;

  const renderTaskList = () => {
    if (!loading && taskDocList) {
      return <ul>
        {
          taskList?.map((el) => {
            return <TaskComponent
              bgColor={el.bgColor}
              dateAdd={el['dateAdd'].toDate()}
              done={el.done}
              text={el.text}
              id={el.id}
              key={el.id} />
          })
        }
      </ul>
    } else if (loading) {
      return <p><FontAwesomeIcon className='spinner' size={'2x'} icon={['fas', 'circle-notch']} /></p>
    } else if (error) {
      return <p>Error loading</p>
    }
    else {
      return <p>No tasks</p>
    }
  }
  return (
    <div className='task-list'>
      {renderTaskList()}
    </div >
  )
}

