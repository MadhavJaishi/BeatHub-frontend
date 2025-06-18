interface ButtonLinkProps {
    href: string;
    text: string;
    className?: string;
}

const ButtonLink = ({ href, text, className = "" }: ButtonLinkProps) => {
    return (
        <li className="list-none inline-block">
            <a href={href} className={`px-6 py-2 rounded-full outline-none relative border 
         dark:bg-violet-600 cursor-pointer transform transition duration-300 ${className}`}>
                <span className="relative z-10 text-white text-center">{text}</span>
            </a>
        </li>
    )
}

export default ButtonLink