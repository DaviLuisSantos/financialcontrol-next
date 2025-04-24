'use client';
import { useState } from "react";

export default function CategoriaForm({ onSubmit, categoria }) {
    const [nome, setNome] = useState(categoria?.nome || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nome.trim()) {
            onSubmit({ nome });
            setNome("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 flex flex-col space-y-4 p-6 shadow-lg rounded-lg bg-gradient-to-r from-[#3b3b4f] to-[#44475a]"
        >
            <input
                type="text"
                value={nome}
                placeholder="Digite o nome da categoria"
                onChange={(e) => setNome(e.target.value)}
                className="p-3 border border-transparent rounded-md bg-[#282a36] text-[#f8f8f2] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bd93f9] focus:border-[#bd93f9] transition-all duration-300"
            />
            <button
                id="button"
                type="submit"
                className="text-[#282a36] px-4 py-2 rounded-md font-semibold hover:from-[#6272a4] hover:to-[#505c7a] hover:text-white transition-all duration-300 shadow-md"
            >
                Adicionar Categoria
            </button>
        </form>
    );
}