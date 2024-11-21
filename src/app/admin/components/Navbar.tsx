import { IoIosBasket, IoIosKeypad } from "react-icons/io"

const Navbar = () => {
    return (
        <nav className="fixed left-1/2 bottom-2 -translate-x-1/2 text-4xl flex gap-6 py-2 px-5 bg-white shadow-md rounded-full">
           <IoIosBasket /> 
           <IoIosKeypad />
        </nav>
    )
}

export default Navbar