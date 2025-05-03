'use client';
import { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ReusableCard } from '@/components/Card';
import { ReusablePieChart } from '@/components/Charts/Pie';
import { BarChartComponent } from '@/components/Charts/Bar';
import { getToken } from '@/utils/auth';
import { DashContext } from '@/contexts/DashboardContext';
import { Line } from 'react-chartjs-2';
import { DialogDemo } from '@/components/Modal';

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

  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barChartTitle, setBarChartTitle] = useState('');
  const [barChartDescription, setBarChartDescription] = useState('');

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

    if (monthInfos.monthBalance.length > 1) {
      const lastMonth = monthInfos.monthBalance[monthInfos.monthBalance.length - 1].valor;
      const previousMonth = monthInfos.monthBalance[monthInfos.monthBalance.length - 2].valor;
      const decimalDifference = (lastMonth - previousMonth).toFixed(2);
      const percentageDifference = ((decimalDifference / previousMonth) * 100).toFixed(2);

      setBarChartTitle(decimalDifference);
      setBarChartDescription(`${percentageDifference}%`);
    }
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-[#f8f8f2]">Dashboard</h1>
        <DialogDemo />
      </div>

      {/* Resumo Financeiro */}
      <section>
        <h2 className="text-2xl font-semibold text-[#f8f8f2] mb-4">Resumo Financeiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </section>

      {/* Gráficos */}
      <section>
        <h2 className="text-2xl font-semibold text-[#f8f8f2] mb-4">Análise Gráfica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReusablePieChart
            title="Despesas por Categoria"
            description="Distribuição das despesas do mês"
            data={pieData}
            dataKey="value"
            nameKey="name"
            footerText="Dados atualizados"
            footerSubtext="Baseado nas categorias do mês"
          />
          <BarChartComponent
            title="Lançamentos Mensais"
            data={barData}
            dataKey="value"
            xAxisKey="label"
            color="#bd93f9"
            footerText="Dados atualizados"
            footerSubtext="Período: Últimos meses"
            decimalVariation={barChartTitle}
            percentageVariation={barChartDescription}
          />
          <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
            <h2 className="text-lg font-semibold mb-4 text-[#ff79c6]">Saldo Semanal</h2>
            <Line data={lineData} />
          </div>
        </div>
      </section>

      {/* Informações Adicionais */}
      <section>
        <h2 className="text-2xl font-semibold text-[#f8f8f2] mb-4">Informações Adicionais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
            <h3 className="text-lg font-semibold mb-4">Categoria com Maior Custo</h3>
            <p>Alimentação - R$ 500</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
            <h3 className="text-lg font-semibold mb-4">Categoria com Maior Lucro</h3>
            <p>Educação - R$ 400</p>
          </div>
        </div>
      </section>

      {/* Últimos Lançamentos */}
      <section>
        <h2 className="text-2xl font-semibold text-[#f8f8f2] mb-4">Últimos Lançamentos</h2>
        <div className="p-6 rounded-lg shadow-md bg-[#44475a] text-[#f8f8f2]">
          <ul className="space-y-2">
            <li>Compra de supermercado - R$ 200 (Alimentação)</li>
            <li>Mensalidade da academia - R$ 150 (Saúde)</li>
            <li>Venda de produto - R$ 300 (Outros)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}