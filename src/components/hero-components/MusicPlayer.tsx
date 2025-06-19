import { useEffect, useState } from "react";
import MusicTracker from "./MusicTracker"

const song = {
    thumbnail: "https://c.saavncdn.com/188/Long-Drive-Bollywood-Mix-Arijit-Singh-Hindi-2023-20240415184815-500x500.jpg",
    songName: "Mahi Ve",
    artistName: "Arijit Singh",
    currentTime: 40,
    duration: 240
}

const MusicPlayer = () => {
    const [currentTime, setCurrentTime] = useState(song.currentTime);

    // Simulate playing
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime((time) => {
                if (time >= song.duration) {
                    clearInterval(interval);
                    return song.duration;
                }
                return time + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [song.duration]);
    return (
        <div className="flex-1 py-8 px-4 bg-body border border-color rounded-xl shadow-lg text-center space-y-4 h-[500px] max-h-[500px]">
            <h1 className="text-2xl font-bold text-heading-1">Now Playing</h1>

            <div className="rounded-lg overflow-hidden shadow-md max-h-[300px]">
                <img
                    src={song.thumbnail}
                    alt={`${song.songName} cover`}
                    className="w-full h-full object-cover"
                />
            </div>

            <h2 className="text-xl font-semibold text-heading-1">{song.songName}</h2>
            <h3 className="text-heading-1 text-sm -my-3">{song.artistName}</h3>

            <MusicTracker currentTime={currentTime} duration={song.duration} />
        </div>

    )
}

export default MusicPlayer