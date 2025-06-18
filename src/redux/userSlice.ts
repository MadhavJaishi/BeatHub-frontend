import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import API from '../components/config/API';

interface UserState {
    user: {
        name: string;
        email: string;
    } | null;
    loading: boolean;
    error: string | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false,
};

export const addUser = createAsyncThunk(
    'user/addUser',
    async (userData: { name: string; email: string }, { rejectWithValue }) => {
        try {
            const response = await API.post(
                "v1/users/addUser",
                userData
            );
            return response.data; // Return the response data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to add user');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action: PayloadAction<{ name: string; email: string }>) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;