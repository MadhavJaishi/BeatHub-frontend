import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import API from '../config/API';

type roleType = 'user' | 'admin';
interface UserState {
    user: {
        id: string;
        name: string;
        email: string;
        role: roleType;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId: string) => {
        try {
            const response = await API.post(
                `v1/users//getUser/${userId}`,
            );
            return { ...response.data, id: userId };
        } catch (error: any) {
            return console.error(error.response?.data || 'Failed to add user');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<{ id: string, name: string; email: string, role: roleType }>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;