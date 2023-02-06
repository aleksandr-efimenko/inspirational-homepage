import React from 'react'
import './Tasks.css';

export default function TaskForm() {
    return (
        <div className='task-form' >
            <h1>What's on your mind today?</h1>
            <form >
                <input type='text'></input>
                <input type='submit'></input>
            </form>
        </div>
    )
}
