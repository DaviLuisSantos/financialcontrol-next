'use client';
import { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ReusableCard } from '@/components/Card';
import { ReusablePieChart } from '@/components/Charts/Pie';
import { BarChartComponent } from '@/components/Charts/Bar';
import { getToken } from '@/utils/auth';
import { DashContext } from '@/contexts/DashboardContext';
import { DialogDemo } from '@/components/Modal';
import LancamentoList from '@/components/LancamentoList';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const { monthInfos } = useContext(DashContext);
  const router = useRouter();

  const [pieData, setPieData] = useState([]);
  const [entriesBarData, setEntriesBarData] = useState([]);
  const [entriesChartConfig, setEntriesChartConfig] = useState({});
  const [barChartTitle, setBarChartTitle] = useState('');
  const [barChartDescription, setBarChartDescription] = useState('');
  const [balanceBarData, setBalanceBarData] = useState([]);
  const [balanceChartConfig, setBalanceChartConfig] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user && !getToken()) {
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    if (monthInfos.monthBalance.length === 0) return;

    const formattedBalanceData = monthInfos.monthBalance.map((item) => ({
      mes: item.mes,
      entrada: item.entrada,
      saida: item.saida,
      saldo: item.saldo,
    }));
    setBalanceBarData(formattedBalanceData);

    setBalanceChartConfig({
      entrada: { label: "Entradas", color: "#4caf50" },
      saida: { label: "Saídas", color: "#f44336" },
      saldo: { label: "Saldo", color: "#2196f3" },
    });
  }, [monthInfos.monthBalance]);

  useEffect(() => {
    if (monthInfos.monthCategories.length === 0) return;

    const formattedPieData = monthInfos.monthCategories.map((item) => ({
      name: item.categoria,
      value: item.valor,
    }));
    setPieData(formattedPieData);
  }, [monthInfos.monthCategories]);

  useEffect(() => {
    if (!monthInfos.monthEntries || monthInfos.monthEntries.length === 0) return;

    const formattedEntriesData = monthInfos.monthEntries.map((item) => ({
      categoria: item.categoria,
      valor: item.valor,
    }));
    setEntriesBarData(formattedEntriesData);

    setEntriesChartConfig({
      valor: { label: "Receitas", color: "#4caf50" },
    });
  }, [monthInfos.monthEntries]);

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-[#f8f8f2]">Dashboard</h1>
        <DialogDemo />
      </div>

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
            title="Saldo Atual"
            description="Saldo disponível"
            value={`R$ ${monthInfos.currentBalance}`}
            badgeText={monthInfos.balanceChange}
          />
          <ReusableCard
            title="Total de Saídas"
            description="Saídas no mês"
            value={`R$ ${monthInfos.totalExits}`}
            badgeText={monthInfos.exitsChange}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#f8f8f2] mb-4">Análise Gráfica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReusablePieChart
            title="Receitas por Categoria"
            description="Distribuição das receitas do mês"
            data={entriesBarData}
            dataKey="valor"
            nameKey="categoria"
            footerText="Dados atualizados"
            footerSubtext="Baseado nas categorias do mês"
          />

          <BarChartComponent
            title="Lançamentos Mensais"
            description="Entradas, Saídas e Saldo"
            data={balanceBarData}
            config={balanceChartConfig}
            xAxisKey="mes"
            footerText="Dados atualizados"
            footerSubtext="Período: Últimos meses"
          //decimalVariation={barChartTitle}
          //percentageVariation={barChartDescription}
          />
          <ReusablePieChart
            title="Despesas por Categoria"
            description="Distribuição das despesas do mês"
            data={pieData}
            dataKey="value"
            nameKey="name"
            footerText="Dados atualizados"
            footerSubtext="Baseado nas categorias do mês"
          />
        </div>
      </section>

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
      <LancamentoList isLoading={isLoading} />
    </div>
  );
}