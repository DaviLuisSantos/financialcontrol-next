'use client';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar'; // Importação do componente Sidebar
import Navbar from './Navbar'; // Importação do componente Navbar

export default function Layout({ children }) {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-[#1e1e28] to-[#282a36] text-[#f8f8f2]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <main className="flex-1 flex flex-col ml-56">
                {/* Navbar */}
                <Navbar user={user} onLogout={handleLogout} />

                {/* Conteúdo da página */}
                <div className="flex-1 bg-gradient-to-r from-[#2c2c38] to-[#3b3b4f] shadow-lg rounded-lg p-8 m-4">
                    {children}
                </div>
            </main>
        </div>
    );
}