import InsertSong from "./hero-components/InsertSong";
import MusicPlayer from "./hero-components/MusicPlayer";
import SongList from "./hero-components/SongList";


const Hero = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center bg-body">
        <InsertSong />
        <div className="flex flex-col-reverse lg:flex-row w-full gap-10 px-10 md:w-3/4 items-center justify-between">
          <SongList />
          <MusicPlayer />
          
        </div>
      </div>
    </>
  );
};

export default Hero;
