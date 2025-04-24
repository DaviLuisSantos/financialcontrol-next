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
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col space-y-4 p-6 shadow-md rounded-lg">
            <input
                type="text"
                value={nome}
                placeholder="Nome da Categoria"
                onChange={(e) => setNome(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
            />
            <button
                type="submit"
                className="bg-[#50fa7b] text-[#282a36] px-4 py-2 rounded-md hover:bg-[#6272a4] transition duration-300"
            >
                Adicionar
            </button>
        </form>
    )
}