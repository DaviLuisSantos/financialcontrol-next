"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { getMonthInfos } from "@/services/dashboardService";
import { useRouter } from "next/navigation";

export const DashContext = createContext();

const DEFAULT_MONTH_INFOS = {
    totalEntries: 0,
    totalExits: 0,
    currentBalance: 0,
    entriesChange: 0,
    exitsChange: 0,
    balanceChange: 0,
    monthBalance: [],
    monthCategories: [],
};

export function DashProvider({ children }) {
    const [monthInfos, setMonthInfos] = useState(DEFAULT_MONTH_INFOS);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchMonthInfos = useCallback(async () => {
        try {
            const response = await getMonthInfos();
            setMonthInfos({
                totalEntries: response?.receita?.total || 0,
                totalExits: response?.despesa?.total || 0,
                currentBalance: response?.saldo?.total || 0,
                entriesChange: response?.receita?.diferenca || 0,
                exitsChange: response?.despesa?.diferenca || 0,
                balanceChange: response?.saldo?.diferenca || 0,
                monthEntries: Array.isArray(response?.categoriasMensaisReceitas) ? response.categoriasMensaisReceitas : [],
                monthBalance: Array.isArray(response?.saldoMensal) ? response.saldoMensal : [],
                monthCategories: Array.isArray(response?.categoriasMensais) ? response.categoriasMensais : [],
            });
        } catch (error) {
            console.error("Erro ao buscar informações do mês:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMonthInfos();
    }, [fetchMonthInfos]);

    return (
        <DashContext.Provider value={{ monthInfos, loading }}>
            {children}
        </DashContext.Provider>
    );
}