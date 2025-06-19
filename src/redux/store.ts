import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import darkModeReducer from './darkModeSlice';
import queueReducer from './songQueueSlice';
import authReducer from './authSlice';
import userVotesReducer from './userVotesSlice';

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        darkMode: darkModeReducer,
        queue: queueReducer,
        auth: authReducer,
        uservotes: userVotesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;