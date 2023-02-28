import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { nanoid } from "nanoid";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../../app/firebase";

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
    LoadingTaskStatus?: 'idle' | 'loading' | 'failed',
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

export const getTasksFromFirestoreAsync =
    createAsyncThunk(
        'tasks/getTasksFromFirestore',
        async () => {
            if (!auth.currentUser) return [];
            const q = query(collection(db, TASKS_COLLECTION), where('uid', '==', auth.currentUser?.uid));
            const tasks: Task[] = [];
            await getDocs(q).then(response =>
                response.forEach(doc => {
                    tasks.push(
                        {
                            text: doc.data().text,
                            uid: doc.data().uid,
                            done: doc.data().done,
                            id: doc.data().id,
                            dateAdd: doc.data().dateAdd.toDate(),
                            bgColor: doc.data().bgColor
                        } as Task)
                }));
            return tasks;
        }
    );
export const addTaskAsync = createAsyncThunk(
    'tasks/addTask',
    async (newTask: Task) => {
        return setDoc(doc(db, TASKS_COLLECTION, newTask.id), {
            ...newTask
        })
            .then(() => { return newTask })
            .catch(() => { return '' });
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
    tasksList: [],
    // tasksList: getTasksFromLocalStorage(key) || initialTaskList,
    LoadingTaskStatus: 'idle',
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // addTask: (state, action) => {
            // const newTask = {
            //     text: action.payload.text,
            //     id: nanoid(),
            //     done: false,
            //     dateAdd: new Date(),
            //     bgColor: generateBGColor(),
            //     uid: action.payload.uid
            // };
        //     state.tasksList.push(newTask)

        //     if (auth.currentUser) {


        //     } else {
        //         setTasksInBrowserStorage(state.tasksList, key);
        //     }
        // },
        removeTask: (state, action) => {
            state.tasksList = state.tasksList.filter(el => el.id !== action.payload);
            if (auth.currentUser) {
                deleteDoc(doc(db, TASKS_COLLECTION, action.payload));
            }
            else {
                setTasksInBrowserStorage(state.tasksList, key);
            }
        },
        setTaskDone: (state, action) => {
            state.tasksList = state.tasksList.map(el => el.id === action.payload ? { ...el, done: true } : el);

            if (auth.currentUser) {
                const cityRef = doc(db, TASKS_COLLECTION, action.payload);
                setDoc(cityRef, { done: true }, { merge: true });
            }
            else {
                setTasksInBrowserStorage(state.tasksList, key);
            }
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
            .addCase(getTasksFromFirestoreAsync.pending, (state) => {
                state.LoadingTaskStatus = 'loading';
            })
            .addCase(getTasksFromFirestoreAsync.fulfilled, (state, action) => {
                state.LoadingTaskStatus = 'idle';
                if (action.payload) {
                    state.tasksList = action.payload;
                    // setTasksInBrowserStorage(state.tasksList, key);
                }
            })
            .addCase(getTasksFromFirestoreAsync.rejected, (state) => {
                state.LoadingTaskStatus = 'failed';
            })
            .addCase(addTaskAsync.pending, (state) => {
                state.AddTaksStatus = 'loading';
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.AddTaksStatus = 'idle';
                if (typeof action.payload !== 'string') {
                    state.tasksList.push(action.payload);
                }
            })
            .addCase(addTaskAsync.rejected, (state) => {
                state.AddTaksStatus = 'failed';
            })
    }
})

export const { removeTask, setTaskDone, initializeTasksFromLocalStorage } = tasksSlice.actions;

export const selectTasksState = (state: RootState) => state.tasks;

export default tasksSlice.reducer;