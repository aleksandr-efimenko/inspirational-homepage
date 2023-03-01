import React, { FormEvent, useRef } from 'react'
import './Tasks.css';
import { useAppDispatch } from '../../app/hooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import { addTaskAsync, addTaskLocal, generateBGColor } from '../../features/tasks/tasksSlice';
import { nanoid } from 'nanoid';

export default function TaskForm() {
    const [user] = useAuthState(auth);

    const dispatch = useAppDispatch();
    const newTaskText = useRef<HTMLInputElement>(null);
    const charLimit = 1000;
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!newTaskText.current || !newTaskText.current.value)
            return;

        const newTask = {
            text: newTaskText.current.value.slice(0, charLimit),
            id: nanoid(),
            done: false,
            dateAdd: new Date(),
            bgColor: generateBGColor(),
            uid: user?.uid
        };

        if (user) {
            dispatch(addTaskAsync(newTask));
        } else {
            dispatch(addTaskLocal(newTask));
        }

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
