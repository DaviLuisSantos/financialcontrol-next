'use client';
import { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ReusableCard } from '@/components/Card';
import { ReusablePieChart } from '@/components/Charts/Pie'; // Importando o novo componente reutilizável
import { BarChartComponent } from '@/components/Charts/Bar';
import { getToken } from '@/utils/auth';
import { getMonthInfos } from '@/services/dashboardService';
import { ButtonDemo } from '@/components/Button';
import { DialogDemo } from '@/components/Modal'
import { DashContext } from '@/contexts/DashboardContext';
import { Line } from 'react-chartjs-2';

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
  const { monthInfos } = useContext(DashContext);
  const router = useRouter();


  const [barData, setBarData] = useState([]); // Estado para os dados do gráfico de barras
  const [pieData, setPieData] = useState([]); // Estado para os dados do gráfico de pizza

  useEffect(() => {
    if (!user && !getToken()) {
      router.push('/login');
    }
  }, [user]);


  useEffect(() => {
    if (monthInfos.monthBalance.length === 0) return;
    const formattedBarData = monthInfos.monthBalance?.map((item) => ({
      label: item.mes,
      value: item.valor,
    })) || [];
    setBarData(formattedBarData);
  }, [monthInfos.monthBalance]);


  useEffect(() => {
    if (monthInfos.monthCategories.length === 0) return;
    const formattedPieData = monthInfos.monthCategories?.map((item) => ({
      name: item.categoria,
      value: item.valor,
    })) || [];
    setPieData(formattedPieData);
  }, [monthInfos.monthCategories]);


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
      <div className='flex flex-row items-start justify-between mb-6'>
        <h1 className="text-3xl font-bold mb-6 text-[#f8f8f2]">Dashboard</h1>
        <DialogDemo
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-auto pb-2">
        <ReusableCard
          title="Total de Entradas"
          description="Entradas no mês"
          value={`R$ ${monthInfos.totalEntries}`}
          badgeText={monthInfos.entriesChange}
        />
        <ReusableCard
          title="Total de Saídas"
          description="Saídas no mês"
          value={`R$ ${monthInfos.totalExits}`}
          badgeText={monthInfos.exitsChange}
        />
        <ReusableCard
          title="Saldo Atual"
          description="Saldo disponível"
          value={`R$ ${monthInfos.currentBalance}`}
          badgeText={monthInfos.balanceChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <ReusablePieChart
          title="Despesas por Categoria"
          description="Distribuição das despesas do mês"
          data={pieData} // Dados dinâmicos do gráfico de pizza
          dataKey="value"
          nameKey="name"
          footerText="Dados atualizados"
          footerSubtext="Baseado nas categorias do mês"
        />

        <BarChartComponent
          title="Lançamentos Mensais"
          description="Valores mensais de lançamentos"
          data={barData} // Dados dinâmicos do gráfico de barras
          dataKey="value"
          xAxisKey="label"
          color="#bd93f9"
          footerText="Dados atualizados"
          footerSubtext="Período: Últimos meses"
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