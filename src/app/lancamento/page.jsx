'use client';
import { useEffect, useState, useContext } from 'react';
import { getLancamentosByUsuario, createLancamento } from '@/services/lancamentoService';
import LancamentoForm from '../../components/LancamentoForm';
import LancamentoList from '../../components/LancamentoList';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/auth';

export default function LancamentosPage() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [lancamentos, setLancamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user && !getToken()) {
            router.push('/login');
            return;
        }

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
    }, [user]);

    const handleCriar = async (dados) => {
        const ok = await createLancamento(dados);
        if (ok) {
            const data = await getLancamentosByUsuario();
            setLancamentos(data);
        }
    };

    if (!user) return null;

    return (
        <div>
            <h1 className="text-4xl font-bold text-[#f8f8f2] mb-8 text-center">
                Lançamentos
            </h1>
            <p className="text-[#bd93f9] text-center mb-8 text-lg">
                Gerencie seus lançamentos financeiros de forma simples e intuitiva.
            </p>

            <LancamentoForm onCriar={handleCriar} />
            <div className="flex-1 overflow-hidden">
                <LancamentoList lancamentos={lancamentos} isLoading={isLoading} />
            </div>
        </div>
    );
}