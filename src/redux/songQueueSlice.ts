import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Song {
    id: string;
    title: string;
    artist: string;
    duration: number;
    votes: number;
    paid: number;
    addedAt: string;
}

interface QueueState {
    songs: Song[];
}

const initialState: QueueState = {
    songs: [],
};

const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {
        setQueue: (state, action: PayloadAction<Song[]>) => {
            state.songs = action.payload;
        },
        clearQueue: (state) => {
            state.songs = [];
        },
    },
});

export const { setQueue, clearQueue } = queueSlice.actions;
export default queueSlice.reducer;