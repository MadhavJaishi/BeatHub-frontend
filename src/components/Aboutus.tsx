import { FaMusic, FaVoteYea, FaRocket } from "react-icons/fa";

const boxMsgs = [
    {
        icon: <FaMusic className="text-2xl text-pink-600" />,
        text: "Share Your Music",
        para: "Submit your favorite YouTube songs. Free users can share 2 songs per hour, while premium users get 2 additional paid submissions.",
    },
    {
        icon: <FaVoteYea className="text-2xl text-purple-600" />,
        text: "Vote & Discover",
        para: "Each user gets one vote per song. Help the best tracks rise to the top and discover new music through community recommendations.",
    },
    {
        icon: <FaRocket className="text-2xl text-yellow-600" />,
        text: "Boost Your Songs",
        para: "Want your song to stand out? Use our boost feature to move your track up in the queue. Higher boosts mean better positioning.",
    },
];

const Aboutus = () => {
    return (
        <section
            id="about"
            className="w-full flex flex-col justify-center sm:w-5/6 lg:w-4/6 mx-auto mt-16 px-6 pb-6 bg-gradient-to-r bg-body rounded-lg"
        >
            <h1 className="text-4xl font-bold mb-2 text-center text-heading-1">About Us</h1>

            <div className="flex flex-col sm:flex-row sm:gap-5 space-y-8 sm:space-y-0">
                {boxMsgs.map(({ icon, text, para }, index) => (
                    <div
                        key={index}
                        className="flex p-4 gap-4 sm:gap-0 flex-row sm:flex-col w-full bg-box rounded-lg shadow-lg flex-1"
                    >
                        <div className="flex pt-2 items-center justify-center sm:mx-auto sm:w-auto w-12 h-12">
                            {icon}
                        </div>
                        <div>
                            <h2 className="text-heading-1 font-semibold py-4 mb-2">{text}</h2>
                            <p className="text-heading-2">{para}</p>
                        </div>
                    </div>
                ))}
            </div>


            <p className="mt-12 text-center text-xl italic text-[#ff7676]">
                Join our community and create unforgettable music experiences together.
            </p>
        </section>
    );
};

export default Aboutus;
