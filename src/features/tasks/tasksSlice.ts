import { createSlice } from "@reduxjs/toolkit";
import { uuid } from "uuidv4";

export interface Task {
    text: string,
    id: string,
    done: boolean
}

export interface TasksState {
    tasksList: Task[]
}

const initialState: TasksState = {
    tasksList: [],
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasksList.push({
                text: action.payload.text,
                id: uuid(),
                done: false
            })
        },
        removeTask: (state, action) => {
            state.tasksList = state.tasksList.filter(el => el.id !== action.payload.id);
        },
        setTaskDone: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload.id ? { ...el, done: true } : el);
        }
    }
})