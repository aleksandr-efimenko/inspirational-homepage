import { createSlice } from "@reduxjs/toolkit";
import { uuid } from "uuidv4";
import { RootState } from "../../app/store";

export interface Task {
    text: string,
    id: string,
    done: boolean
}

export interface TasksState {
    tasksList: Task[]
}

const initialState: TasksState = {
    tasksList: [{
        text: 'Do something',
        id: '324234',
        done: false
    },
    {
        text: 'Create a pitch',
        id: 'dds',
        done: false
    }],
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

export const { addTask, removeTask, setTaskDone } = tasksSlice.actions;

export const selectTaskList = (state: RootState) => state.tasks.tasksList;

export default tasksSlice.reducer;