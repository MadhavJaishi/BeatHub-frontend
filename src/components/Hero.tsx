import InsertSong from "./hero-components/InsertSong";
import MusicPlayer from "./hero-components/MusicPlayer";
import SongList from "./hero-components/SongList";

const Hero = () => {
    return (<>
        <div className="flex flex-col h-screen w-full items-center bg-body">
            <InsertSong />
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-10 px-10">
                <SongList />
                <MusicPlayer />
            </div>
        </div>
    </>);
}

export default Hero