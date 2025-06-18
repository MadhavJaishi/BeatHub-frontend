import Container from "./shared/Container";
import NavItem from "./shared/NavItem";
import ButtonLink from "./shared/ButtonLink";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/darkMode";
import type { RootState } from "../redux/store";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import logo from "../assets/logo.png";

const navItems = [
    { href: '#', text: 'Home' },
    { href: '#services', text: 'Services' },
    { href: '#about-us', text: 'About Us' },
    { href: '#features', text: 'Features' }
]; ``
const Navbar = () => {
    const { darkMode } = useSelector((state: RootState) => state.darkMode);
    const dispatch = useDispatch();
    const handleThemeToggle = () => {
        dispatch(toggleDarkMode());
    }
    return (
        <header className="inset-x-0 top-0 z-50 py-6">
            <Container>
                <nav className="w-full flex justify-between gap-6 relative">
                    <div className="min-w-max inline-flex relative">
                        <a href="/" className="relative flex items-center gap-3">
                            <img src={logo} alt="Logo" className="w-28" />
                        </a>
                    </div>

                    <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:items-center 
          absolute top-full left-0 lg:static lg:top-0 bg-body lg:bg-transparent
          border-x border-x-box-border lg:border-x-0 lg:h-auto h-0">
                        <ul className="border-t border-box-border lg:border-t-0 px-6 
            lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg 
            text-heading-2 w-full lg:justify-center lg:items-center">
                            {navItems.map((item, key) => (
                                <NavItem key={key} href={item.href} text={item.text} />
                            ))}
                        </ul>
                        <div className="lg:min-w-max flex items-center sm:w-max w-full lg:pb-0 
            border-b border-box-border lg:border-0 px-6 lg:px-0">
                            <ButtonLink text="Get Started" href="#cta" className="" />
                        </div>
                    </div>

                    <div className="min-w-max flex items-center gap-x-3">
                        <button onClick={handleThemeToggle} className="outline-hidden flex relative text-heading-2 rounded-full p-2 lg:p-3 border border-box-border cursor-pointer">
                            {/* <img src={darkModeIcon} height={24} width={24} className=""></img> */}
                            {darkMode ?
                                <MdDarkMode className="text-2xl" /> :
                                <MdOutlineDarkMode className="text-2xl text-gray-500" />
                            }

                        </button>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Navbar