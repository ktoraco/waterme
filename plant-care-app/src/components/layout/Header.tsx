import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="p-4">
            <h1 className="text-3xl font-extrabold font-quicksand tracking-wide">
                <span className="text-deep-700">Water</span>
                <span className="text-deep-700">Me</span>
            </h1>
            <nav>
                <ul className="flex space-x-4 pt-2 text-teal-500 font-medium">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/calendar" className="hover:underline">Calendar</Link></li>
                    <li><Link href="/plant/add" className="hover:underline">Add Plant</Link></li>
                    <li><Link href="/settings" className="hover:underline">Settings</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;