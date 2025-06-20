import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import Container from "./shared/Container";
import NavItem from "./shared/NavItem";
import logo from "../assets/logo.png";
import { toggleDarkMode } from "../redux/darkModeSlice";
import type { RootState } from "../redux/store";

const navItems = [
    { href: "#home", text: "Home" },
    { href: "#leaderboard", text: "Leaderboard" },
    { href: "#about", text: "About" },
];

const Navbar = () => {
    const { darkMode } = useSelector((state: RootState) => state.darkMode);
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(navItems[0]);

    const handleThemeToggle = () => {
        dispatch(toggleDarkMode());
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute("id");
                        const matched = navItems.find((i) => i.href === `#${sectionId}`);
                        if (matched) setActiveItem(matched);
                    }
                }
            },
            { threshold: 0.6 }
        );

        navItems.forEach((item) => {
            const el = document.querySelector(item.href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <header id='home' className="sticky inset-x-0 top-0 z-50 py-6 bg-body">
            <Container>
                <nav className="w-full flex justify-between gap-6 relative items-center">
                    <div className="min-w-max inline-flex relative">
                        <a href="/" className="relative flex items-center gap-3">
                            <img src={logo} alt="Logo" className="w-16 lg:w-28" />
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden sm:flex flex-row w-full justify-between items-center">
                        <ul className="flex flex-row gap-x-6 text-lg text-heading-2 w-full justify-center items-center">
                            {navItems.map((item, key) => (
                                <NavItem
                                    key={key}
                                    href={item.href}
                                    text={item.text}
                                // isActive={activeItem.href === item.href}
                                />
                            ))}
                        </ul>
                        {/* <div className="min-w-max">
                            <ButtonLink text="Get Started" href="#cta" />
                        </div> */}
                    </div>

                    {/* Mobile Nav */}
                    <div className="sm:hidden flex bg-body items-center justify-end w-full relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            onBlur={() => setDropdownOpen(false)}
                            className="flex items-center justify-between px-3 py-2 border border-box-border rounded text-heading-2 text-sm gap-2"
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen}
                        >
                            {activeItem?.text}
                            <FaChevronDown className="text-sm" />
                        </button>

                        {dropdownOpen && (
                            <div className={`absolute top-full left-0 mt-2 w-full bg-body border border-box-border rounded shadow-md z-50 transition-transform ease-in-out ${dropdownOpen ? "duration-300 opacity-100 scale-100" : "duration-500 opacity-0 scale-95"
                                }`}>
                                <ul className="flex flex-col divide-y divide-box-border">
                                    {navItems.map((item, key) => (
                                        <li key={key}>
                                            <a
                                                href={item.href}
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                    setActiveItem(item);
                                                }}
                                                className={`block w-full text-heading-1 border border-color text-left px-4 py-3 hover:bg-gray-400 ${activeItem.href === item.href ? "font-bold" : ""
                                                    }`}
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="min-w-max flex items-center gap-x-3">
                        <button
                            onClick={handleThemeToggle}
                            className="outline-hidden flex relative text-heading-2 rounded-full p-2 border border-box-border cursor-pointer"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <MdDarkMode className="text-xl" />
                            ) : (
                                <MdOutlineLightMode className="text-xl text-gray-500" />
                            )}
                        </button>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Navbar;
