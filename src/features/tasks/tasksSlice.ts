import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { nanoid } from "nanoid";

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
    return `hsl(${Math.floor(Math.random() * 361)}, 50%, 40%)`;
  }


const initialState: TasksState = {
    tasksList: [{
        text: 'Create new feature',
        id: nanoid(),
        done: false,
        bgColor: generateBGColor()
    },
    {
        text: 'Workout for 30 minutes',
        id: nanoid(),
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
                id: nanoid(),
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