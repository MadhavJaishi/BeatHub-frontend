import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import type { Song } from "../../redux/songQueueSlice";
import { FaRegThumbsUp } from "react-icons/fa";
// const songDemo: Song[] = [
//   {
//     id: "1",
//     title: "Blinding Lights",
//     artist: "The Weeknd",
//     duration: 200,
//     votes: 12,
//     paid: 5,
//     addedAt: "18/06/25 10:00",
//   },
//   {
//     id: "2",
//     title: "Levitating",
//     artist: "Dua Lipa",
//     duration: 203,
//     votes: 8,
//     paid: 0,
//     addedAt: "18/06/25 10:05",
//   },
//   {
//     id: "3",
//     title: "Peaches",
//     artist: "Justin Bieber",
//     duration: 198,
//     votes: 5,
//     paid: 2,
//     addedAt: "18/06/25 10:10",
//   },
//   {
//     id: "4",
//     title: "Watermelon Sugar",
//     artist: "Harry Styles",
//     duration: 174,
//     votes: 9,
//     paid: 3,
//     addedAt: "18/06/25 10:12",
//   },
//   {
//     id: "5",
//     title: "As It Was",
//     artist: "Harry Styles",
//     duration: 195,
//     votes: 15,
//     paid: 10,
//     addedAt: "18/06/25 10:20",
//   },
//   {
//     id: "6",
//     title: "Watermelon Sugar",
//     artist: "Harry Styles",
//     duration: 174,
//     votes: 9,
//     paid: 3,
//     addedAt: "18/06/25 10:12",
//   },
//   {
//     id: "7",
//     title: "As It Was",
//     artist: "Harry Styles",
//     duration: 195,
//     votes: 15,
//     paid: 10,
//     addedAt: "18/06/25 10:20",
//   },
// ];

const SongList = () => {
  const songQueue = useSelector((state: RootState) => state.queue.songs);
  console.log("Song Queue:", songQueue);
  // const userVotes = useSelector((state: RootState) => state.uservotes.votedSongs);
  return (
    <div className="flex-1 w-full bg-body items-start px-4 py-8 border border-color rounded-xl shadow-lg text-center space-y-4 h-[500px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-heading-1">Popular Songs</h1>
      <div
        id="leaderboard"
        className="divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm"
      >
        {songQueue && songQueue.length > 0 ? (
          songQueue.map((song: Song, index: number) => (
            <div
              key={index}
              className="flex flex-col  items-center justify-between py-4 hover:border-color transition-colors cursor-pointer"
            >
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-semibold text-heading-1 truncate">
                  {song.title}
                </h2>
                <div className="flex flex-row space-x-4 text-sm text-heading-1">
                  <span className="truncate">{song.artist}</span>
                  <span className="whitespace-nowrap">{song.addedAt}</span>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-4">
                <div className="text-heading-1 min-w-[40px] text-right">
                  {song.paid ? (
                    <span className="text-green-400">
                      Paid Rs <strong>{`${song.paid}`}</strong>
                    </span>
                  ) : (
                    <span className="text-yellow-300">Unpaid</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    aria-label="Vote for song"
                    className="flex items-center gap-1 text-blue-400 hover:text-pink-800 disabled:text-gray-400 transition-colors"
                    disabled={song.paid > 0}
                    onClick={() => {
                      /* your vote handler here */
                    }}
                  >
                    <span className="text-heading-1">Vote </span>
                    <FaRegThumbsUp className="text-xl sm:text-2xl" />
                  </button>
                </div>
                <div className="flex items-center space-x-1 text-heading-1">
                  <span className="font-semibold text-heading-1">{0}</span>
                  <FaRegThumbsUp className="text-sm text-teal-400" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-6 text-center text-gray-500">No songs available.</p>
        )}
      </div>
    </div>
  );
};

export default SongList;
