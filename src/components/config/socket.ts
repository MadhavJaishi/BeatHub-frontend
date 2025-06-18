import io from 'socket.io-client';
import { setQueue } from '../redux/songQueue';
import type { Song } from '../redux/songQueue';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';

const socket = io('http://localhost:3000');

const dispatch = useDispatch<AppDispatch>();

socket.on('queueUpdated', (queue: Song[]) => {
    console.log('Updated queue received:', queue);
    dispatch(setQueue(queue)); // Update Redux store
});

export default socket;