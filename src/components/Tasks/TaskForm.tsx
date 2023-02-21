import React, { FormEvent, useRef } from 'react'
import './Tasks.css';
import { useAppDispatch } from '../../app/hooks';
import { addTask } from '../../features/tasks/tasksSlice';

export default function TaskForm() {
    const dispatch = useAppDispatch();
    const newTaskText = useRef<HTMLInputElement>(null);
    const charLimit = 1000;
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!newTaskText.current || !newTaskText.current.value)
            return;
        dispatch(addTask(newTaskText.current.value.slice(0, charLimit)))
        newTaskText.current.value = '';
    }
    return (
        <div className='task-form' >
            <h1>What's on your mind today?</h1>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <input
                        type='text'
                        className='white-text-input'
                        ref={newTaskText}
                        ></input>
                    <input type='submit' className='white-button'></input>
                </div>
            </form>
        </div>
    )
}
