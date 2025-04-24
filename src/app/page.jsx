'use client';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import InfoCard from '@/components/InfoCard';
import { getToken } from '@/utils/auth';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

// Registrar os elementos necessários do Chart.js
ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user && !getToken()) {
      router.push('/login');
    }
  }, [user]);

  // Dados para os gráficos
  const pieData = {
    labels: ['Alimentação', 'Transporte', 'Lazer', 'Educação', 'Outros'],
    datasets: [
      {
        data: [500, 300, 200, 400, 100],
        backgroundColor: ['#ff79c6', '#50fa7b', '#bd93f9', '#ffb86c', '#8be9fd'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Lançamentos Mensais (R$)',
        data: [1200, 1500, 800, 1700, 900, 1300],
        backgroundColor: '#bd93f9',
        borderColor: '#6272a4',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Saldo Semanal (R$)',
        data: [2000, 2500, 2200, 2700],
        fill: false,
        borderColor: '#50fa7b',
        tension: 0.4,
      },
    ],
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-[#f8f8f2]">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-auto pb-2">

        <InfoCard title="Total de Categorias" value="12" />
        <InfoCard title="Lançamentos no mês" value="R$ 4.500" />
        <InfoCard title="Saldo Atual" value="R$ 2.250" color='#50fa7b' />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
          <h2 className="text-lg font-semibold mb-4 text-[#bd93f9]">Despesas por Categoria</h2>
          <Pie data={pieData} />
        </div>

        <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
          <h2 className="text-lg font-semibold mb-4 text-[#50fa7b]">Lançamentos Mensais</h2>
          <Bar data={barData} />
        </div>

        <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
          <h2 className="text-lg font-semibold mb-4 text-[#ff79c6]">Saldo Semanal</h2>
          <Line data={lineData} />
        </div>
      </div>
    </Layout>
  );
}