'use client';
import { useState, useEffect } from 'react';
import { getCategoriasByUsuario } from '@/services/categoriaService';

export default function LancamentoForm({ onCriar }) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategoriasByUsuario();
                setCategorias(data || []);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (descricao && valor && data && categoria) {
            onCriar({ descricao, valor: parseFloat(valor), data, categoria });
            setDescricao('');
            setValor('');
            setData('');
            setCategoria('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 grid md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-[#3b3b4f] to-[#44475a] rounded-lg shadow-lg"
        >
            <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="p-3 border border-transparent rounded-md bg-[#282a36] text-[#f8f8f2] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bd93f9] focus:border-[#bd93f9] transition-all duration-300"
                required
            />
            <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="p-3 border border-transparent rounded-md bg-[#282a36] text-[#f8f8f2] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bd93f9] focus:border-[#bd93f9] transition-all duration-300"
                required
            />
            <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="p-3 border border-transparent rounded-md bg-[#282a36] text-[#f8f8f2] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bd93f9] focus:border-[#bd93f9] transition-all duration-300"
                required
            />
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="p-3 border border-transparent rounded-md bg-[#282a36] text-[#f8f8f2] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bd93f9] focus:border-[#bd93f9] transition-all duration-300"
                required
            >
                <option value="" disabled>
                    Selecione uma categoria
                </option>
                {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.nome}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="col-span-full md:col-span-1 bg-gradient-to-r from-[#50fa7b] to-[#3be97a] text-[#282a36] px-4 py-3 rounded-md font-semibold hover:from-[#6272a4] hover:to-[#505c7a] hover:text-white transition-all duration-300 shadow-md"
            >
                Adicionar
            </button>
        </form>
    );
}