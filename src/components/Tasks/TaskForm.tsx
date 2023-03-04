import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import './Tasks.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase';
import { addTaskAsync, addTaskLocal, editTaskTextAsync, editTaskTextLocal, generateBGColor, selectTaskForEditState, setTaskForEdit } from '../../features/tasks/tasksSlice';
import { nanoid } from 'nanoid';

function TaskForm() {
    const [user] = useAuthState(auth);
    const inputReference = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const [newTaskText, setNewTaskText] = useState('');
    const taskForEdit = useAppSelector(selectTaskForEditState);
    const charLimit = 1000;
    const handleTextEdit = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskText(e.target.value)
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!newTaskText)
            return;
        //If create new task
        if (!taskForEdit) {
            const newTask = {
                text: newTaskText.slice(0, charLimit),
                id: nanoid(),
                done: false,
                bgColor: generateBGColor(),
                uid: user?.uid,
                timestamp: Date.now()
            };

            if (user) {
                dispatch(addTaskAsync(newTask));
            } else {
                dispatch(addTaskLocal(newTask));
            }
        } else { //if edit task from the list
            if (user) {
                dispatch(editTaskTextAsync({ ...taskForEdit, text: newTaskText }));
            } else {
                dispatch(editTaskTextLocal({ ...taskForEdit, text: newTaskText }));
            }
            dispatch(setTaskForEdit(''));
        }

        setNewTaskText('');
    }

    useEffect(() => {
        if (taskForEdit) {
            setNewTaskText(taskForEdit.text);
            if (inputReference.current)
                inputReference.current.focus();
        } else {
            setNewTaskText('');
        }
    }, [taskForEdit])

    return (
        <div className='task-form' >
            <h1>What's on your mind today?</h1>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <input
                        ref={inputReference}
                        type='text'
                        className='white-text-input'
                        value={newTaskText}
                        onChange={handleTextEdit}
                    ></input>
                    <input type='submit' className='white-button'></input>
                </div>
            </form>
        </div>
    )
}

export default React.memo(TaskForm)