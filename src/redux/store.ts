import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import darkModeReducer from './darkMode';
import queueReducer from './songQueue';

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        darkMode: darkModeReducer,
        queue: queueReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;