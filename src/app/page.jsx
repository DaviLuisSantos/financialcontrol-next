'use client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ReusableCard } from '@/components/Card';
import { ReusablePieChart } from '@/components/Charts/Pie'; // Importando o novo componente reutilizável
import { BarChartComponent } from '@/components/Charts/Bar';
import { getToken } from '@/utils/auth';
import { getMonthInfos } from '@/services/dashboardService';
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
  const router = useRouter();

  const [monthInfos, setMonthInfos] = useState({
    totalEntries: 0,
    totalExits: 0,
    currentBalance: 0,
    entriesChange: '',
    exitsChange: '',
    balanceChange: '',
  });

  const [barData, setBarData] = useState([]); // Estado para os dados do gráfico de barras
  const [pieData, setPieData] = useState([]); // Estado para os dados do gráfico de pizza

  useEffect(() => {
    if (!user && !getToken()) {
      router.push('/login');
    }
  }, [user]);

  // Função para buscar os dados do mês
  const fetchMonthInfos = async () => {
    try {
      const response = await getMonthInfos();
      console.log('Dados do mês:', response);

      // Atualizar os dados do mês
      setMonthInfos({
        totalEntries: response.receita?.total || 0,
        totalExits: response.despesa?.total || 0,
        currentBalance: response.saldo?.total || 0,
        entriesChange: response.receita?.diferenca || 0,
        exitsChange: response.despesa?.diferenca || 0,
        balanceChange: response.saldo?.diferenca || 0,
      });

      // Atualizar os dados do gráfico de barras
      const formattedBarData = response.saldoMensal?.map((item) => ({
        label: item.mes,
        value: item.valor,
      })) || [];
      setBarData(formattedBarData);

      // Atualizar os dados do gráfico de pizza
      const formattedPieData = response.categoriasMensais?.map((item) => ({
        name: item.categoria,
        value: item.valor,
      })) || [];
      setPieData(formattedPieData);
    } catch (error) {
      console.error('Erro ao buscar dados do mês:', error);
    }
  };

  useEffect(() => {
    fetchMonthInfos();
  }, []);

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
          title="Total de Entradas"
          description="Entradas no mês"
          value={`R$ ${monthInfos.totalEntries}`}
          badgeText={monthInfos.entriesChange}
          footerText="Comparado ao mês anterior"
        />
        <ReusableCard
          title="Total de Saídas"
          description="Saídas no mês"
          value={`R$ ${monthInfos.totalExits}`}
          badgeText={monthInfos.exitsChange}
          footerText="Comparado ao mês anterior"
        />
        <ReusableCard
          title="Saldo Atual"
          description="Saldo disponível"
          value={`R$ ${monthInfos.currentBalance}`}
          badgeText={monthInfos.balanceChange}
          footerText="Nenhuma alteração significativa"
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