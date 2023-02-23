import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { nanoid } from "nanoid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase";

export interface Task {
    text: string,
    id: string,
    done: boolean,
    bgColor?: string,
    uid?: string
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
const setTasksInBrowserStorage = (tasks: Task[], key: string) => {
    if (tasks) {
        localStorage.setItem(key, JSON.stringify(tasks))
    }
}

const setTaskInFirestore = async (task: Task) => {

}

const initialTaskList =  [{
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
}];

const initialState: TasksState = {
    tasksList: getTasksFromLocalStorage(key) || initialTaskList
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                text: action.payload.text,
                id: nanoid(),
                done: false,
                bgColor: generateBGColor(),
                uid: action.payload.uid
            };
            state.tasksList.push(newTask)

            if (action.payload.uid) {
                setDoc(doc(db, 'tasks', newTask.id), {
                    ...newTask
                }).catch(error => console.log(error));
                setTasksInBrowserStorage(state.tasksList, key);
            }
        },
        removeTask: (state, action) => {
            state.tasksList = state.tasksList.filter(el => el.id !== action.payload);
            setTasksInBrowserStorage(state.tasksList, key);
        },
        setTaskDone: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload ? { ...el, done: true } : el);
            setTasksInBrowserStorage(state.tasksList, key);
        },
        setTasksFromFirestore: (state, action) => {
            state.tasksList = action.payload;
            setTasksInBrowserStorage(state.tasksList, key);
        },
        setTasksFromInitialState: (state) => {
            state.tasksList = initialTaskList;
            setTasksInBrowserStorage(state.tasksList, key);
        }
    }
})

export const { addTask, removeTask, setTaskDone, setTasksFromFirestore } = tasksSlice.actions;

export const selectTaskList = (state: RootState) => state.tasks.tasksList;

export default tasksSlice.reducer;