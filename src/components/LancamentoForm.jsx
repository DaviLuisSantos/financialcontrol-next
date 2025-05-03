'use client';

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { getCategoriasByUsuario } from "@/services/categoriaService";
import { createLancamento, getLancamentosByUsuario } from "@/services/lancamentoService";

const FormSchema = z.object({
    descricao: z.string().min(1, { message: "Descrição é obrigatória." }),
    valor: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Insira um valor válido." }),
    data: z.string().min(1, { message: "A data é obrigatória." }),
    categoria: z.string().min(1, { message: "Selecione uma categoria." }),
    tipo: z.enum(["0", "1"], { message: "Selecione o tipo de lançamento." }),
});

export default function LancamentoForm({ onCriar }) {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(""); // Estado para controlar a categoria selecionada
    const [error, setError] = useState("");

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            descricao: "",
            valor: "",
            data: "",
            categoria: "",
            tipo: "",
        },
    });

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategoriasByUsuario();
                setCategorias(data || []);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
                setError("Não foi possível carregar as categorias.");
            }
        };

        fetchCategorias();
    }, []);

    const handleCriar = async (dados) => {
        try {
            const ok = await createLancamento(dados);
            if (ok) {
                const data = await getLancamentosByUsuario();
                if (onCriar) {
                    onCriar(data);
                }
            }
        } catch (error) {
            console.error("Erro ao criar lançamento:", error);
            setError("Não foi possível criar o lançamento.");
        }
    };

    function onSubmit(data) {
        handleCriar({
            ...data,
            valor: parseFloat(data.valor),
            categoriaId: parseInt(data.categoria),
            tipo: parseInt(data.tipo),
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-4 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
            >
                {error && <p className="col-span-full text-red-500">{error}</p>}
                <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Input placeholder="Descrição do lançamento" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="valor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="100.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="data"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(value) => {
                                setCategoriaSelecionada(value); // Atualiza o estado local
                                form.setValue("categoria", value); // Atualiza o estado do formulário
                            }}
                            value={categoriaSelecionada} // Vincula ao estado local
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categorias.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        {cat.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Despesa</SelectItem>
                                        <SelectItem value="1">Receita</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="col-span-full">
                    Adicionar
                </Button>
            </form>
        </Form>
    );
}