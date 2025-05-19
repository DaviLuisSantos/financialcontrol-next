'use client';
import React, { useEffect, useState } from 'react';
import { getLancamentosByUsuario, deleteLancamentoById } from '@/services/lancamentoService';
import LancamentoEditModal from './LancamentoEditModal';

export default function LancamentoList({ isLoading: parentIsLoading }) {
    const [lancamentos, setLancamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(parentIsLoading || true);
    const [successMessage, setSuccessMessage] = useState('');
    const [editLancamento, setEditLancamento] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este lançamento?')) {
            try {
                await deleteLancamentoById(id);
                setLancamentos((prev) => prev.filter((l) => l.id !== id));
                setSuccessMessage('Lançamento excluído com sucesso!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch {
                alert('Erro ao excluir lançamento.');
            }
        }
    };

    const handleEdit = (lancamento) => {
        setEditLancamento(lancamento);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setEditLancamento(null);
    };

    const handleUpdated = async () => {
        // Atualiza a lista após edição
        const data = await getLancamentosByUsuario();
        data.sort((a, b) => new Date(b.data) - new Date(a.data));
        setLancamentos(data);
        setSuccessMessage('Lançamento atualizado com sucesso!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    useEffect(() => {
        const fetchLancamentos = async () => {
            setIsLoading(true);
            try {
                const data = await getLancamentosByUsuario();
                data.sort((a, b) => new Date(b.data) - new Date(a.data));
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
            {successMessage && (
                <div className="text-center py-2 text-green-400 font-semibold">
                    {successMessage}
                </div>
            )}
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
                            <th className="p-4 font-semibold">Ações</th>
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
                                <td className="p-4 flex gap-2">
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                        onClick={() => handleEdit(l)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(l.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center py-6 text-[#f8f8f2]">
                    Nenhum lançamento encontrado.
                </div>
            )}
            {modalOpen && editLancamento && (
                <LancamentoEditModal
                    open={modalOpen}
                    onClose={handleModalClose}
                    lancamento={editLancamento}
                    onUpdated={handleUpdated}
                />
            )}
        </div>
    );
}