import React, { FormEvent, useState } from 'react'
import './Tasks.css';
import { useAppDispatch } from '../../app/hooks';
import { addTask } from '../../features/tasks/tasksSlice';

export default function TaskForm() {
    const dispatch = useAppDispatch();
    const [newTaskText, setNewTaskText] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!newTaskText) 
            return;
        dispatch(addTask(newTaskText))
        setNewTaskText('');
    }
    return (
        <div className='task-form' >
            <h1>What's on your mind today?</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setNewTaskText(e.target.value)} value={newTaskText} type='text'></input>
                <input type='submit'></input>
            </form>
        </div>
    )
}
