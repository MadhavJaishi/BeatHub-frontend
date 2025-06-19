const MusicTracker = ({ currentTime, duration }: { currentTime: number, duration: number }) => {
    // Format seconds to mm:ss
    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Calculate progress bar width percentage
    const progressPercent = (duration === 0 ? 0 : (currentTime / duration) * 100);

    return (
        <div className="w-full mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>

            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                    className="h-2 bg-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
};

export default MusicTracker;