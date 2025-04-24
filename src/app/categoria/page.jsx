'use client';
import { useContext, useEffect, useState } from 'react';
import { getCategoriasByUsuario, createCategoria } from '@/services/categoriaService';
import CategoriaForm from '@/components/CategoriaForm';
import Layout from '@/components/Layout';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/auth';

export default function CategoriaPage() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [categorias, setCategorias] = useState([]); // Inicializado como array vazio para evitar erros de map

    useEffect(() => {
        if (!user && !getToken()) {
            router.push('/login');
            return; // Adicionado return para evitar execução desnecessária
        }

        const fetchCategorias = async () => {
            try {
                const response = await getCategoriasByUsuario();
                setCategorias(response.data || []); // Garantir que seja um array
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategorias();
    }, [user, router]); // Adicionado router como dependência

    const handleCreateCategoria = async (categoria) => {
        try {
            await createCategoria(categoria);
            const response = await getCategoriasByUsuario(user.id); // Atualizar a lista após criar
            setCategorias(response.data || []);
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Categorias</h1>
            <CategoriaForm onSubmit={handleCreateCategoria} />

            <ul className="rounded shadow-md p-4 bg-[#44475a] mt-4">
                {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                        <li key={categoria.id} className="flex justify-between items-center p-2 border-b border-[#6272a4]">
                            <span className="text-[#f8f8f2]">{categoria.nome}</span>
                            <button className="text-[#ff5555] hover:text-[#ff79c6]">Excluir</button>
                        </li>
                    ))
                ) : (
                    <li className="text-[#f8f8f2]">Nenhuma categoria encontrada.</li>
                )}
            </ul>
        </Layout>
    );
}