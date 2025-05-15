'use client';
import React, { useEffect, useState } from 'react';
import { getLancamentosByUsuario } from '@/services/lancamentoService';

export default function LancamentoList({ isLoading: parentIsLoading }) {
    const [lancamentos, setLancamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(parentIsLoading || true);

    useEffect(() => {
        const fetchLancamentos = async () => {
            setIsLoading(true);
            try {
                const data = await getLancamentosByUsuario();
                setLancamentos(data);
            } catch (error) {
                console.error('Erro ao buscar lançamentos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLancamentos();
    }, []);

    return (
        <div className="overflow-auto bg-[#282a36] rounded-lg shadow-lg mt-6">
            {isLoading ? (
                <div className="text-center py-6 text-[#f8f8f2] animate-pulse">
                    Carregando lançamentos...
                </div>
            ) : lancamentos.length > 0 ? (
                <table className="w-full min-w-[500px] text-left text-[#f8f8f2]">
                    <thead className="bg-[#3b3b4f]">
                        <tr>
                            <th className="p-4 font-semibold">Descrição</th>
                            <th className="p-4 font-semibold">Valor</th>
                            <th className="p-4 font-semibold">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lancamentos.map((l) => (
                            <tr
                                key={l.id}
                                className="border-t border-[#44475a] hover:bg-[#343746] transition-all duration-200"
                            >
                                <td className="p-4">{l.descricao}</td>
                                <td className="p-4">R$ {l.valor.toFixed(2)}</td>
                                <td className="p-4">{new Date(l.data).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center py-6 text-[#f8f8f2]">
                    Nenhum lançamento encontrado.
                </div>
            )}
        </div>
    );
}