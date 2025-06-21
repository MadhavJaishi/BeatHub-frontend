import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import YouTube from "react-youtube";
import MusicTracker from "./MusicTracker";
import socket from "../../config/socket";

declare global {
  interface Window {
    YT: any;
  }
}

const MusicPlayer = () => {
  const lastTimeRef = useRef(0);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAdmin =
    useSelector((state: RootState) => state.auth.role) === "admin";
  const songQueue = useSelector((state: RootState) => state.queue.songs);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number | null>(null);

  const [videoId, setVideoId] = useState("");
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    socket.on(
      "playSong",
      ({ song, startTime }: { song: any; startTime: number }) => {
        setVideoId(song.videoId);
        setStartTime(startTime);
      }
    );

    return () => {
      socket.off("playSong");
    };
  }, []);

  const opts = {
    height: "380",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
    },
  };
  const onPlayerReady = (event: any) => {
    if (songQueue && songQueue.length > 0) {
      const nextSong = songQueue[0];
      setVideoId(nextSong.videoId);
    }
    if (!isAdmin) {
      const currentTime = (Date.now() - startTime) / 1000;
      event.target.seekTo(currentTime, true);
      event.target.mute(); // 👈 Mute for non-admins
    } else {
      event.target.unMute(); // 👈 Admin can hear
    }

    event.target.playVideo();
    event.target.playVideo();
    playerRef.current = event.target;
    setDuration(event.target.getDuration().toFixed(0));
    setCurrentTime(0);
  };

  const clearCurrentTimeInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      // Fetch the first song from the queue
      if (songQueue && songQueue.length > 0) {
        const nextSong = songQueue[0];
        setVideoId(nextSong.videoId);
        // socket.emit('playSong', { song: nextSong, startTime: Date.now() });
      } else {
        setVideoId("");
      }
      return;
    }
    const player = playerRef.current;
    if (!player) return;

    if (
      // Always force play if paused/stopped by user
      event.data === window.YT.PlayerState.PAUSED ||
      event.data === window.YT.PlayerState.ENDED
    ) {
      player.playVideo();
      clearCurrentTimeInterval();
      return;
    }

    if (event.data === window.YT.PlayerState.PLAYING) {
      // Watch for seeking attempts
      const checkTime = setInterval(() => {
        if (!player) return;

        const current = player.getCurrentTime();
        setCurrentTime(current.toFixed(0));

        // If user seeks (diff > 1s), return to last safe time
        if (Math.abs(current - lastTimeRef.current) > 1) {
          player.seekTo(lastTimeRef.current, true);
          player.playVideo();
        } else {
          lastTimeRef.current = current;
        }
      }, 500);
      intervalRef.current = checkTime;

      // Stop interval when video ends
      const stopChecking = () => clearCurrentTimeInterval();
      player.addEventListener("onStateChange", (e: any) => {
        if (e.data === window.YT.PlayerState.ENDED) stopChecking();
      });
    }
  };

  useEffect(() => {
    return () => {
      clearCurrentTimeInterval();
    };
  }, []);

  return (
    <div className="flex-1 py-8 px-4 bg-body border border-color rounded-xl shadow-lg text-center space-y-4 h-[520px] max-h-[520px]">
      <h1 className="text-2xl font-bold text-heading-1">Now Playing</h1>

      <div className="rounded-lg overflow-hidden shadow-md max-h-[400px]">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>

      {!!duration && (
        <MusicTracker currentTime={currentTime} duration={duration} />
      )}
    </div>
  );
};

export default MusicPlayer;
