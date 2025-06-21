import { IoIosMusicalNotes } from "react-icons/io";
import { useState } from "react";
import API from "../../config/API";
const InsertSong = () => {
  const [ytUrl, setYtUrl] = useState("");
  const handleSongSubmit = async () => {
    if (!ytUrl.trim()) {
      alert("Please enter a YouTube URL.");
      return;
    }
    try {
      console.log("Submitting song with URL:", ytUrl);
      const response = await API.post("/v1/songs/checkValidity", {
        url: ytUrl,
      });
      console.log("Response from server:", response);
      if (response.status !== 200) {
        alert("Invalid YouTube URL. Please try again.");
        return;
      }
      const {
        valid,
        isSong,
        isTooLong,
        title,
        artist,
        videoId,
        durationInSeconds,
      } = response.data;
      if (!valid) {
        alert("Invalid YouTube URL. Please try again.");
        return;
      }
      if (!isSong) {
        alert(
          "The provided link is not a song. Please try again with a valid song link."
        );
        return;
      }
      if (isTooLong) {
        alert("The song is too long. Please choose a song under 6 minutes.");
        return;
      }
      console.log("Video ID:", videoId);
      const response2 = await API.post(
        `/v1/songs/addtoqueue/${localStorage.getItem("userId")}`,
        {
          videoId: videoId,
          duration: durationInSeconds,
          title: title,
          artist: artist,
        }
      );
      console.log("Response from addtoqueue:", response2);
      if (response2.status === 200) {
        alert("Song submitted successfully!");
        setYtUrl("");
      } else {
        alert(response2.data.message || "Failed to submit song.");
      }
    } catch (error) {
      console.error("Error submitting song:", error);
      alert("Failed to submit song. Please try again.");
    }
  };
  return (
    <section id="home" className="w-5/6 md:w-1/2 lg:w-2/5 mx-10 my-10">
      <div className="flex flex-row items-center justify-center mb-6 space-x-4">
        <IoIosMusicalNotes className="text-heading-1" size={34} />
        <h1 className="text-3xl font-bold text-heading-1 mb-4">
          {" "}
          Share a YouTube Song
        </h1>
      </div>
      <div className="border border-color p-6 rounded-xl shadow-lg space-y-4">
        <label
          htmlFor="youtube-url"
          className="block text-sm font-medium text-heading-1"
        >
          YouTube Link
        </label>
        <input
          type="text"
          value={ytUrl}
          onChange={(e) => setYtUrl(e.target.value)}
          id="youtube-url"
          placeholder="Paste YouTube URL here..."
          className="text-heading-1 w-full px-4 py-2 border border-color rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />

        <p className="text-sm text-heading-1">
          Share your favorite song with the community! Just paste a YouTube link
          above and hit the button.
        </p>

        <div className="text-right">
          <button
            onClick={handleSongSubmit}
            className="inline-flex items-center gap-2 bg-pink-500 text-white font-semibold px-5 py-2 rounded-md hover:bg-pink-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12 6-12 6z"
              />
            </svg>
            Suggest Song
          </button>
        </div>
      </div>
    </section>
  );
};

export default InsertSong;
