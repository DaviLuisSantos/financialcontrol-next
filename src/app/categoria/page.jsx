'use client';
import { useContext, useEffect, useState } from 'react';
import { getCategoriasByUsuario, createCategoria } from '@/services/categoriaService';
import CategoriaForm from '@/components/CategoriaForm';
import CategoriaList from '@/components/CategoriaList';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/auth';

export default function CategoriaPage() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [categorias, setCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user && !getToken()) {
            router.push('/login');
            return;
        }

        const fetchCategorias = async () => {
            setIsLoading(true);
            try {
                const response = await getCategoriasByUsuario();
                console.log('Categorias retornadas:', response);
                setCategorias(response || []);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategorias();
    }, [user, router]);

    const handleCreateCategoria = async (categoria) => {
        try {
            await createCategoria(categoria);
            const response = await getCategoriasByUsuario(user.id);
            setCategorias(response.data || []);
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-[#f8f8f2] mb-6 text-center">
                Gerenciar Categorias
            </h1>
            <p className="text-[#bd93f9] text-center mb-8">
                Adicione, visualize e gerencie suas categorias de forma simples e intuitiva.
            </p>
            <CategoriaForm onSubmit={handleCreateCategoria} />
            <CategoriaList categorias={categorias} isLoading={isLoading} />
        </div>
    );
}