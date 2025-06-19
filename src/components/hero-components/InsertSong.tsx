import { IoIosMusicalNotes } from "react-icons/io";
const InsertSong = () => {
    return (
        <div className="w-full max-w-xl mx-auto my-10">
            <div className="flex flex-row items-center justify-center mb-6 space-x-4">
                <IoIosMusicalNotes className="text-heading-1" size={34} />
                <h1 className="text-3xl font-bold text-heading-1 mb-4"> Share a YouTube Song</h1>

            </div>
            <div className="border border-color p-6 rounded-xl shadow-lg space-y-4">
                <label htmlFor="youtube-url" className="block text-sm font-medium text-heading-1">
                    YouTube Link
                </label>
                <input
                    type="text"
                    id="youtube-url"
                    placeholder="Paste YouTube URL here..."
                    className="text-heading-1 w-full px-4 py-2 border border-color rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />

                <p className="text-sm text-heading-1">
                    Share your favorite song with the community! Just paste a YouTube link above and hit the button.
                </p>

                <div className="text-right">
                    <button className="inline-flex items-center gap-2 bg-pink-500 text-white font-semibold px-5 py-2 rounded-md hover:bg-pink-600 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12 6-12 6z" />
                        </svg>
                        Suggest Song
                    </button>
                </div>
            </div>
        </div>

    )
}

export default InsertSong