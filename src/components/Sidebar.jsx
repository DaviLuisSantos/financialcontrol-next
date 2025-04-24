'use client';
import React from 'react';

export default function Sidebar() {
    return (
        <aside className="w-56 bg-gradient-to-b from-[#3b3b4f] to-[#44475a] shadow-xl p-4 fixed h-full hidden md:flex flex-col">
            <h2 className="text-2xl font-bold text-[#bd93f9] mb-8 text-center">
                Financial Control
            </h2>
            <nav className="space-y-4">
                <a
                    href="/"
                    className="block text-[#f8f8f2] text-base font-medium hover:text-[#50fa7b] hover:underline transition-all duration-200"
                >
                    Dashboard
                </a>
                <a
                    href="/categoria"
                    className="block text-[#f8f8f2] text-base font-medium hover:text-[#50fa7b] hover:underline transition-all duration-200"
                >
                    Categorias
                </a>
                <a
                    href="/lancamento"
                    className="block text-[#f8f8f2] text-base font-medium hover:text-[#50fa7b] hover:underline transition-all duration-200"
                >
                    Lançamentos
                </a>
            </nav>
            <footer className="mt-auto text-center text-xs text-[#bd93f9]">
                © {new Date().getFullYear()} Financial Control
            </footer>
        </aside>
    );
}