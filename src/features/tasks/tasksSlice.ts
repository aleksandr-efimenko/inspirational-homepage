import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { nanoid } from "nanoid";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase";

export interface Task {
    text: string,
    id: string,
    done: boolean,
    dateAdd?: Date,
    bgColor?: string,
    uid?: string
}

export interface TasksState {
    tasksList: Task[],
    AddTaksStatus?: 'idle' | 'loading' | 'failed',
    RemoveTaskStatus?: 'idle' | 'loading' | 'failed',
    ChangeTaskStatus?: 'idle' | 'loading' | 'failed',
}

export const generateBGColor = () => {
    return `hsl(${Math.floor(Math.random() * 361)}, 50%, 40%)`;
}

const key = 'taskList'

// const getTasksFromLocalStorage = (key: string) => {
//     const tasks = JSON.parse(localStorage.getItem(key) ?? 'null') as Task[]
//     if (!tasks)
//         return [] as Task[];
//     return tasks;
// }

//Set local storage with 
const setTasksInBrowserStorage = (tasks: Task[], key: string) => {
    if (tasks) {
        localStorage.setItem(key, JSON.stringify(tasks))
    }
}

const TASKS_COLLECTION = "tasks";

export const addTaskAsync = createAsyncThunk(
    'tasks/addTask',
    async (newTask: Task) => {
        setDoc(doc(db, TASKS_COLLECTION, newTask.id), {
            ...newTask
        })
    }
)

export const removeTaskAsync = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: string) => {
        deleteDoc(doc(db, TASKS_COLLECTION, taskId));
    }
)

export const setTaskDoneAsync = createAsyncThunk(
    'tasks/setTaskDone',
    async (taskId: string) => {
        const cityRef = doc(db, TASKS_COLLECTION, taskId);
        setDoc(cityRef, { done: true }, { merge: true });
    }
)

const initialTaskList = [{
    text: 'Create new feature',
    id: nanoid(),
    done: false,
    dateAdd: new Date(),
    bgColor: generateBGColor()
},
{
    text: 'Workout for 30 minutes',
    id: nanoid(),
    done: false,
    dateAdd: new Date(),
    bgColor: generateBGColor()
}];

const initialState: TasksState = {
    tasksList: []
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTaskLocal: (state, action) => {
            const newTask = {
                text: action.payload.text,
                id: nanoid(),
                done: false,
                dateAdd: new Date(),
                bgColor: generateBGColor(),
                uid: action.payload.uid
            }
            state.tasksList.push(newTask)
            setTasksInBrowserStorage(state.tasksList, key);
        },
        removeTaskLocal: (state, action) => {
            state.tasksList = state.tasksList.filter(el => el.id !== action.payload);
            setTasksInBrowserStorage(state.tasksList, key);
        },
        setTaskDoneLocal: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload ? { ...el, done: true } : el);
            setTasksInBrowserStorage(state.tasksList, key);
        },
        initializeTasksFromLocalStorage: (state) => {
            const tasks = JSON.parse(localStorage.getItem(key) ?? 'null') as Task[]
            if (tasks) {
                state.tasksList = tasks;
            } else {
                state.tasksList = initialTaskList;
                setTasksInBrowserStorage(state.tasksList, key);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTaskAsync.pending, (state) => {
                state.AddTaksStatus = 'loading';
            })
            .addCase(addTaskAsync.fulfilled, (state) => {
                state.AddTaksStatus = 'idle';
            })
            .addCase(addTaskAsync.rejected, (state) => {
                state.AddTaksStatus = 'failed';
            })
            .addCase(removeTaskAsync.pending, (state) => {
                state.RemoveTaskStatus = 'loading';
            })
            .addCase(removeTaskAsync.fulfilled, (state) => {
                state.RemoveTaskStatus = 'idle';
            })
            .addCase(removeTaskAsync.rejected, (state) => {
                state.RemoveTaskStatus = 'failed';
            })
            .addCase(setTaskDoneAsync.pending, (state) => {
                state.ChangeTaskStatus = 'loading';
            })
            .addCase(setTaskDoneAsync.fulfilled, (state) => {
                state.ChangeTaskStatus = 'idle';
            })
            .addCase(setTaskDoneAsync.rejected, (state) => {
                state.ChangeTaskStatus = 'failed';
            })
    }
})

export const { addTaskLocal, removeTaskLocal, setTaskDoneLocal, initializeTasksFromLocalStorage } = tasksSlice.actions;

export const selectTasksState = (state: RootState) => state.tasks;

export default tasksSlice.reducer;