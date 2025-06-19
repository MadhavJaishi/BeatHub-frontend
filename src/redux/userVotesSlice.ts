import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserVotesState {
    votedSongs: string[]; // array of song ids user voted for
    loading: boolean;
    error: string | null;
}

const initialState: UserVotesState = {
    votedSongs: [],
    loading: false,
    error: null,
};

// Fetch current user's votes on app start
export const fetchUserVotes = createAsyncThunk('userVotes/fetchUserVotes', async () => {
    const response = await axios.get('/api/user/votes');
    return response.data as string[];
});

const userVotesSlice = createSlice({
    name: 'userVotes',
    initialState,
    reducers: {
        addVote(state, action) {
            const songId = action.payload;
            if (!state.votedSongs.includes(songId)) {
                state.votedSongs.push(songId);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserVotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserVotes.fulfilled, (state, action) => {
                state.votedSongs = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserVotes.rejected, (state, action) => {
                state.error = action.error.message ?? 'Failed to fetch user votes';
                state.loading = false;
            });
    },
});

export const { addVote } = userVotesSlice.actions;

export default userVotesSlice.reducer;
