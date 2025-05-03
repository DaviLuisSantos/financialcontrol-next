import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CategoriaList({ categorias, isLoading }) {
    return (
        <div className="mt-4 rounded-lg shadow-lg p-4 bg-gradient-to-r from-[#3b3b4f] to-[#44475a]">
            {isLoading ? (
                <Alert variant="default" className="animate-pulse">
                    <AlertTitle>Carregando...</AlertTitle>
                    <AlertDescription>Carregando categorias...</AlertDescription>
                </Alert>
            ) : categorias.length > 0 ? (
                <ul className="space-y-2">
                    {categorias.map((categoria) => (
                        <li
                            key={categoria.id}
                            className="flex justify-between items-center p-3 bg-[#282a36] rounded-lg hover:bg-[#343746] transition-all duration-200 shadow-md"
                        >
                            <span className="text-[#f8f8f2] font-medium">{categoria.nome}</span>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => alert(`Excluir categoria: ${categoria.nome}`)} // Substitua por lógica real
                            >
                                Excluir
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <Alert variant="default">
                    <AlertTitle>Nenhuma categoria encontrada</AlertTitle>
                    <AlertDescription>
                        Não há categorias cadastradas no momento.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}