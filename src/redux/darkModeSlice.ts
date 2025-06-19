import { createSlice } from '@reduxjs/toolkit';

interface DarkModeState {
    darkMode: boolean;
}

const initialState: DarkModeState = {
    darkMode: localStorage.getItem('darkMode') === 'true',
};

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', state.darkMode.toString());
        },
        setDarkMode(state, action) {
            state.darkMode = action.payload;
            localStorage.setItem('darkMode', action.payload.toString());
        },
    },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;