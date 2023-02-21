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

const key = 'taskLis'

const getTasksFromLocalStorage = (key: string) => {
    const tasks = JSON.parse(localStorage.getItem(key) ?? 'null') as Task[]
    if (tasks)
        return tasks;
}

//Set local storage with 
const setTasksInStorage = (tasks: Task[], key: string) => {
    if (tasks) {
        localStorage.setItem(key, JSON.stringify(tasks))
    }
}

const initialState: TasksState = {
    tasksList:
        getTasksFromLocalStorage(key) ||
        [{
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
            setTasksInStorage(state.tasksList, key);
        },
        removeTask: (state, action) => {
            state.tasksList = state.tasksList.filter(el => el.id !== action.payload);
            setTasksInStorage(state.tasksList, key);
        },
        setTaskDone: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload ? { ...el, done: true } : el);
            setTasksInStorage(state.tasksList, key);
        }
    }
})

export const { addTask, removeTask, setTaskDone } = tasksSlice.actions;

export const selectTaskList = (state: RootState) => state.tasks.tasksList;

export default tasksSlice.reducer;