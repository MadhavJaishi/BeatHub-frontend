import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux"
import type { Song } from "../../redux/songQueueSlice"
const songDemo: Song[] = [
    {
        id: '1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        duration: 200,
        votes: 12,
        paid: 5,
        addedAt: '2025-06-18T10:00:00Z',
    },
    {
        id: '2',
        title: 'Levitating',
        artist: 'Dua Lipa',
        duration: 203,
        votes: 8,
        paid: 0,
        addedAt: '2025-06-18T10:05:00Z',
    },
    {
        id: '3',
        title: 'Peaches',
        artist: 'Justin Bieber',
        duration: 198,
        votes: 5,
        paid: 2,
        addedAt: '2025-06-18T10:10:00Z',
    },
    {
        id: '4',
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        duration: 174,
        votes: 9,
        paid: 3,
        addedAt: '2025-06-18T10:12:00Z',
    },
    {
        id: '5',
        title: 'As It Was',
        artist: 'Harry Styles',
        duration: 195,
        votes: 15,
        paid: 10,
        addedAt: '2025-06-18T10:20:00Z',
    },
    {
        id: '6',
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        duration: 174,
        votes: 9,
        paid: 3,
        addedAt: '2025-06-18T10:12:00Z',
    },
    {
        id: '7',
        title: 'As It Was',
        artist: 'Harry Styles',
        duration: 195,
        votes: 15,
        paid: 10,
        addedAt: '2025-06-18T10:20:00Z',
    },
];

const SongList = () => {
    const songQueue = useSelector((state: RootState) => state.queue.songs)
    // const userVotes = useSelector((state: RootState) => state.uservotes.votedSongs);
    return (
        <div className="flex-1 bg-body items-start mx-auto px-6 py-8 border border-color rounded-xl shadow-lg text-center space-y-4 h-[500px] overflow-y-auto">
            <h1 className="text-2xl font-bold mb-6 text-heading-1">Popular Songs</h1>
            <div className="divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                {songDemo && songDemo.length > 0 ? (
                    songDemo.map((song: Song, index: number) => (
                        <div
                            key={index}
                            className="flex flex-row items-center justify-between py-4 hover:border-color transition-colors cursor-pointer"
                        >
                            <div className="flex flex-col space-y-1 max-w-xs">
                                <h2 className="text-lg font-semibold text-heading-1 truncate">{song.title}</h2>
                                <div className="flex flex-row space-x-4 text-sm text-heading-1">
                                    <span className="truncate">{song.artist}</span>
                                    <span className="whitespace-nowrap">{song.addedAt}</span>
                                </div>
                            </div>

                            <div className="text-sm font-medium text-heading-1 min-w-[40px] text-right">
                                {song.paid ? (
                                    <span className="text-green-600">{`$${song.paid}`}</span>
                                ) : (
                                    <span className="text-red-600">Unpaid</span>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    aria-label="Vote for song"
                                    className="flex items-center gap-1 text-pink-600 hover:text-pink-800 disabled:text-gray-400 transition-colors"
                                    onClick={() => {
                                        /* your vote handler here */
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill={song.votes ? "currentColor" : "none"}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                    </svg>
                                    <span className="font-semibold text-heading-1">{song.votes}</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-6 text-center text-gray-500">No songs available.</p>
                )}
            </div>
        </div>
    )

}

export default SongList