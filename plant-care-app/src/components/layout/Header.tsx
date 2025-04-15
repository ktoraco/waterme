import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-green-500 p-4 text-white">
            <h1 className="text-2xl font-bold">Plant Care App</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/calendar" className="hover:underline">Calendar</a></li>
                    <li><a href="/plant/add" className="hover:underline">Add Plant</a></li>
                    <li><a href="/settings" className="hover:underline">Settings</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;