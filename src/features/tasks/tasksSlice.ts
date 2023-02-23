import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { nanoid } from "nanoid";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../app/firebase";

export interface Task {
    text: string,
    id: string,
    done: boolean,
    bgColor?: string,
    uid?: string
}

export interface TasksState {
    tasksList: Task[],
    status?: 'idle' | 'loading' | 'failed',
    uid?: string
}

const generateBGColor = () => {
    return `hsl(${Math.floor(Math.random() * 361)}, 50%, 40%)`;
}

const key = 'taskList'

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


export const getTasksFromFirestoreAsync =
    createAsyncThunk(
        'tasks/getTasksFromFirestore',
        async (uid: string) => {
            const q = query(collection(db, "tasks"), where('uid', '==', uid));
            const tasks: Task[] = [];
            await getDocs(q).then(response =>
                response.forEach(doc => {
                    tasks.push(
                        {
                            text: doc.data().text,
                            uid: doc.data().uid,
                            done: doc.data().done,
                            id: doc.data().id,
                            bgColor: doc.data().bgColor
                        } as Task)
                }));
            return tasks;
        }
    )

const initialTaskList = [{
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
    tasksList: getTasksFromLocalStorage(key) || initialTaskList,
    status: 'idle',
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setUid: (state, action) => {
            state.uid = action.payload;
        },
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
            }
            // if (!state.uid)
            setTasksInBrowserStorage(state.tasksList, key);
        },
        removeTask: (state, action) => {
            state.tasksList = state.tasksList.filter(el => el.id !== action.payload);
            if (state.uid) {
                deleteDoc(doc(db, "tasks", action.payload));
            } 
            // else {
                setTasksInBrowserStorage(state.tasksList, key);
            // }
        },
        setTaskDone: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload ? { ...el, done: true } : el);

            if (state.uid) {
                const cityRef = doc(db, 'tasks', action.payload);
                setDoc(cityRef, { done: true }, { merge: true });
            } 
            // else {
                setTasksInBrowserStorage(state.tasksList, key);
            // }
        },
        setTasksFromInitialState: (state) => {
            state.tasksList = initialTaskList;
            // if (!state.uid)
                setTasksInBrowserStorage(state.tasksList, key);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasksFromFirestoreAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTasksFromFirestoreAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.tasksList = action.payload;
                    setTasksInBrowserStorage(state.tasksList, key);
                }
            })
            .addCase(getTasksFromFirestoreAsync.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { addTask, removeTask, setTaskDone, setTasksFromInitialState, setUid } = tasksSlice.actions;

export const selectTasksState = (state: RootState) => state.tasks;

export default tasksSlice.reducer;