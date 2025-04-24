'use client';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex bg-[#282a36] text-[#f8f8f2]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#44475a] shadow-lg p-6 hidden md:flex flex-col">
                <h2 className="text-2xl font-bold text-[#bd93f9] mb-8">Financial Control</h2>
                <nav className="space-y-4">
                    <a
                        href="/"
                        className="block text-[#f8f8f2] hover:text-[#50fa7b] hover:underline transition"
                    >
                        Dashboard
                    </a>
                    <a
                        href="/categorias"
                        className="block text-[#f8f8f2] hover:text-[#50fa7b] hover:underline transition"
                    >
                        Categorias
                    </a>
                    <a
                        href="/lancamentos"
                        className="block text-[#f8f8f2] hover:text-[#50fa7b] hover:underline transition"
                    >
                        Lançamentos
                    </a>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex justify-between items-center mb-6 bg-[#44475a] shadow-md p-4 rounded-lg">
                    <span className="text-[#f8f8f2] text-lg">
                        Olá, <strong className="text-[#ff79c6]">{user?.nome || 'Usuário'}</strong>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-[#ff5555] text-[#f8f8f2] px-4 py-2 rounded-lg hover:bg-[#ff6e6e] transition shadow-md"
                    >
                        Sair
                    </button>
                </header>

                {/* Conteúdo da página */}
                <div className="bg-[#44475a] shadow-md rounded-lg p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}