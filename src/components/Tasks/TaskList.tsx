import './Tasks.css';
import { useAppSelector } from '../../app/hooks';
import { Task, selectTasksState } from '../../features/tasks/tasksSlice';
import TaskComponent from './Task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TaskList() {
  const taskList: Task[] = useAppSelector(selectTasksState).tasksList;
  const tasksStatus = useAppSelector(selectTasksState).status;

  const renderTaskList = () => {
    if (tasksStatus === 'idle') {
      return <ul>
        {
          taskList.map((el) => {
            return <TaskComponent
              bgColor={el.bgColor}
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