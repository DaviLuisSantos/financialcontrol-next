import React from 'react';

export default function CategoriaList({ categorias, isLoading }) {
    return (
        <ul className="rounded-lg shadow-lg p-4 bg-gradient-to-r from-[#3b3b4f] to-[#44475a] mt-4">
            {isLoading ? (
                <li className="text-[#f8f8f2] text-center py-4 animate-pulse">
                    Carregando categorias...
                </li>
            ) : categorias.length > 0 ? (
                categorias.map((categoria) => (
                    <li
                        key={categoria.id}
                        className="flex justify-between items-center p-3 mb-2 bg-[#282a36] rounded-lg hover:bg-[#343746] transition-all duration-200 shadow-md"
                    >
                        <span className="text-[#f8f8f2] font-medium">{categoria.nome}</span>
                        <button
                            className="px-3 py-1 text-sm font-semibold text-white bg-[#ff5555] rounded-md hover:bg-[#ff6b6b] transition-all duration-200"
                            onClick={() => alert(`Excluir categoria: ${categoria.nome}`)} // Substitua por lógica real
                        >
                            Excluir
                        </button>
                    </li>
                ))
            ) : (
                <li className="text-[#f8f8f2] text-center py-4">
                    Nenhuma categoria encontrada.
                </li>
            )}
        </ul>
    );
}