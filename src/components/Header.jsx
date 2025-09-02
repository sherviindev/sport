import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoMenu, IoClose } from "react-icons/io5";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: 'home', label: 'Home' },
        { id: 'category', label: 'Category' },
        { id: 'trending', label: 'Trending News' },
        { id: 'recent', label: 'Recent News' },
        { id: 'ranking', label: 'Clubs Ranking' },
        { id: 'articles', label: 'Sports Article' },
    ];

    return (
        <header className='shadow-2xl h-[60px] w-full bg-white z-50 relative'>
            <div className='container mx-auto flex justify-between items-center h-full px-4'>
                
                {/* لوگو */}
                <h2 className="text-lg font-bold">Sport Snap</h2>

                {/* منو دسکتاپ */}
                <ul className='hidden lg:flex gap-4'>
                    {menuItems.map(item => (
                        <li 
                            key={item.id} 
                            id={item.id}
                            className='text-[#2626269d] hover:text-red-500 transition-colors duration-300 cursor-pointer'
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>

                {/* دکمه سرچ دسکتاپ */}
                <div className='hidden lg:flex mt-2'>
                    <button className='flex items-center gap-3 p-[10px] bg-[#B8C2CE] rounded-lg w-[100px] h-[35px] hover:bg-gray-300 transition-colors duration-300'>
                        <CiSearch /> Search
                    </button>
                </div>

                {/* منو موبایل */}
                <div className='lg:hidden flex items-center gap-3'>
                    <button className='mt-2 hover:text-red-500 transition-colors duration-300'>
                        <CiSearch size={24} />
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-xl hover:text-red-500 transition-colors duration-300">
                        {isOpen ? <IoClose /> : <IoMenu />}
                    </button>
                </div>
            </div>

            {/* لیست موبایل */}
            {isOpen && (
                <ul className='lg:hidden flex flex-col gap-4 px-6 py-4 bg-white border-t border-gray-200'>
                    {menuItems.map(item => (
                        <li 
                            key={item.id} 
                            id={item.id}
                            className='text-[#2626269d] hover:text-red-500 transition-colors duration-300 cursor-pointer'
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
};

export default Header;
