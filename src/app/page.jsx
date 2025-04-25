'use client';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ReusableCard } from '@/components/Card';
import { getToken } from '@/utils/auth';
import { Pie, Line } from 'react-chartjs-2';
import { BarChartComponent } from '@/components/bar-chart';

// Registrar os elementos necessários do Chart.js
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
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

  const barData = [
    { label: 'Jan', value: 1200 },
    { label: 'Fev', value: 1500 },
    { label: 'Mar', value: 800 },
    { label: 'Abr', value: 1700 },
    { label: 'Mai', value: 900 },
    { label: 'Jun', value: 1300 },
  ];

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
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#f8f8f2]">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-auto pb-2">
        <ReusableCard
          title="Total de Categorias"
          description="Categorias cadastradas"
          value="12"
          badgeText="Atualizado"
          footerText="Última atualização: Hoje"
        />
        <ReusableCard
          title="Lançamentos no mês"
          description="Total de lançamentos"
          value="R$ 4.500"
          badgeText="+10%"
          footerText="Comparado ao mês anterior"
        />
        <ReusableCard
          title="Saldo Atual"
          description="Saldo disponível"
          value="R$ 2.250"
          badgeText="Estável"
          footerText="Nenhuma alteração significativa"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
          <h2 className="text-lg font-semibold mb-4 text-[#bd93f9]">Despesas por Categoria</h2>
          <Pie data={pieData} />
        </div>

        <BarChartComponent
          title="Lançamentos Mensais"
          description="Valores mensais de lançamentos"
          data={barData}
          dataKey="value"
          xAxisKey="label"
          color="#bd93f9"
          footerText="Dados atualizados"
          footerSubtext="Período: Jan - Jun"
        />

        <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
          <h2 className="text-lg font-semibold mb-4 text-[#ff79c6]">Saldo Semanal</h2>
          <Line data={lineData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
          <h2 className="text-lg font-semibold mb-4">Categoria com Maior Custo</h2>
          <p>Alimentação - R$ 500</p>
        </div>

        <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
          <h2 className="text-lg font-semibold mb-4">Categoria com Maior Lucro</h2>
          <p>Educação - R$ 400</p>
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2] mt-6">
        <h2 className="text-lg font-semibold mb-4">Últimos Lançamentos</h2>
        <ul className="space-y-2">
          <li>Compra de supermercado - R$ 200 (Alimentação)</li>
          <li>Mensalidade da academia - R$ 150 (Saúde)</li>
          <li>Venda de produto - R$ 300 (Outros)</li>
        </ul>
      </div>
    </div>
  );
}