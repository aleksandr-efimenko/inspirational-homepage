import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { v4 as uuid } from 'uuid';

export interface Task {
    text: string,
    id: string,
    done: boolean,
    bgColor?: string
}

export interface TasksState {
    tasksList: Task[]
}

const generateBGColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 50%, 40%)`;
  }


const initialState: TasksState = {
    tasksList: [{
        text: 'Do something',
        id: '324234',
        done: false,
        bgColor: generateBGColor()
    },
    {
        text: 'Create a pitch',
        id: 'dds',
        done: false,
        bgColor: generateBGColor()
    }],
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasksList.push({
                text: action.payload,
                id: uuid(),
                done: false,
                bgColor: generateBGColor()
            })
        },
        removeTask: (state, action) => {
            state.tasksList = state.tasksList.filter(el => el.id !== action.payload);
        },
        setTaskDone: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload ? { ...el, done: true } : el);
        }
    }
})

export const { addTask, removeTask, setTaskDone } = tasksSlice.actions;

export const selectTaskList = (state: RootState) => state.tasks.tasksList;

export default tasksSlice.reducer;