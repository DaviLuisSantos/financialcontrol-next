'use client';
import React from 'react';

export default function Navbar({ user, onLogout }) {
    return (
        <header className="flex justify-between items-center bg-gradient-to-r from-[#3b3b4f] to-[#44475a] shadow-lg p-4">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#50fa7b] rounded-full flex items-center justify-center text-[#282a36] font-bold">
                    {user?.nome?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-lg font-medium">
                    Olá, <strong className="text-[#50fa7b]">{user?.nome || 'Usuário'}</strong>
                </span>
            </div>
            <button
                onClick={onLogout}
                className="bg-gradient-to-r from-[#ff5555] to-[#ff6e6e] text-[#f8f8f2] px-4 py-2 rounded-lg hover:from-[#ff6e6e] hover:to-[#ff7f7f] transition-all duration-200 shadow-md"
            >
                Sair
            </button>
        </header>
    );
}