import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { nanoid } from "nanoid";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase";

export interface Task {
    text: string,
    id: string,
    done: boolean,
    bgColor?: string,
    uid?: string
    timestamp?: number;
}

export interface TasksState {
    tasksList: Task[],
    taskForEdit?: Task,
    idTaskToLoadFromFireStore?: string;
    AddTaksStatus?: 'idle' | 'loading' | 'failed',
    RemoveTaskStatus?: 'idle' | 'loading' | 'failed',
    ChangeTaskStatus?: 'idle' | 'loading' | 'failed',
}

export const generateBGColor = () => {
    return `hsl(${Math.floor(Math.random() * 361)}, 50%, 40%)`;
}

const key = 'taskList'

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
        const taskRef = doc(db, TASKS_COLLECTION, taskId);
        const document = await getDoc(taskRef);
        setDoc(taskRef, { done: !document.data()?.done }, { merge: true });
    }
)

export const editTaskTextAsync = createAsyncThunk(
    'tasks/editTaskText',
    async (editedTask: Task) => {
        const taskRef = doc(db, TASKS_COLLECTION, editedTask.id);
        setDoc(taskRef, { text: editedTask.text }, { merge: true });
    }
)

const initialTaskList = [{
    text: 'Get lunch',
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
                bgColor: generateBGColor(),
                uid: action.payload.uid,
                timestamp: Date.now()
            }
            state.tasksList.push(newTask)
            setTasksInBrowserStorage(state.tasksList, key);
        },
        removeTaskLocal: (state, action) => {
            state.tasksList = state.tasksList.filter(el => el.id !== action.payload);
            setTasksInBrowserStorage(state.tasksList, key);
        },
        setTaskDoneLocal: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload ? { ...el, done: !el.done } : el);
            setTasksInBrowserStorage(state.tasksList, key);
        },
        editTaskTextLocal: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload.id ? { ...el, text: action.payload.text } : el);
            setTasksInBrowserStorage(state.tasksList, key);
        },
        setTaskForEdit: (state, action: PayloadAction<string>) => {
            if (action.payload)
                state.taskForEdit = state.tasksList.find(el => el.id === action.payload);
            else
                state.taskForEdit = undefined;
        },
        setTaskForEditFromFirestore: (state, action: PayloadAction<Task>) => {
            if (action.payload)
                state.taskForEdit = action.payload;
        },
        setTaskIDForEditFromFirestore: (state, action: PayloadAction<string>) => {
            if (action.payload)
                state.idTaskToLoadFromFireStore = action.payload;
            else
                state.idTaskToLoadFromFireStore = undefined;
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
            .addCase(editTaskTextAsync.pending, (state) => {
                state.ChangeTaskStatus = 'loading';
            })
            .addCase(editTaskTextAsync.fulfilled, (state) => {
                state.ChangeTaskStatus = 'idle';
            })
            .addCase(editTaskTextAsync.rejected, (state) => {
                state.ChangeTaskStatus = 'failed';
            })
    }
})

export const { addTaskLocal, setTaskForEdit, setTaskForEditFromFirestore, setTaskIDForEditFromFirestore, editTaskTextLocal, removeTaskLocal, setTaskDoneLocal, initializeTasksFromLocalStorage } = tasksSlice.actions;

export const selectTasksState = (state: RootState) => state.tasks;
export const selectTasksList = (state: RootState) => state.tasks.tasksList;

export const selectTaskForEditState = (state: RootState) => state.tasks.taskForEdit;
export const selectTaskForEditID = (state: RootState) => state.tasks.idTaskToLoadFromFireStore;


export default tasksSlice.reducer;