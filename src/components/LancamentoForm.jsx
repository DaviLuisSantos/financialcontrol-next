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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { getCategoriasByUsuario } from "@/services/categoriaService";
import { createLancamento, getLancamentosByUsuario } from "@/services/lancamentoService";

const FormSchema = z.object({
    descricao: z.string().min(1, { message: "Descrição é obrigatória." }),
    valor: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Insira um valor válido." }),
    data: z.string().min(1, { message: "A data é obrigatória." }),
    categoria: z.string().min(1, { message: "Selecione uma categoria." }),
    tipo: z.enum(["0", "1"], { message: "Selecione o tipo de lançamento." }),
});

export default function LancamentoForm({ onSubmit }) {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                setIsLoading(true);
                const data = await getCategoriasByUsuario();
                setCategorias(data || []);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
                setError("Não foi possível carregar as categorias.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    const handleCriar = async (dados) => {
        try {
            setIsLoading(true);
            const ok = await createLancamento({
                ...dados,
                categoriaId: parseInt(dados.categoria),
                tipo: parseInt(dados.tipo),
            });
            if (ok) {
                const data = await getLancamentosByUsuario();
                if (onSubmit) {
                    onSubmit();
                }
            }
        } catch (error) {
            console.error("Erro ao criar lançamento:", error);
            setError("Não foi possível criar o lançamento.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleCriar)}
                className="grid grid-cols-1 gap-4 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
            >
                {error && (
                    <Alert variant="destructive" className="col-span-full">
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
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
                                setCategoriaSelecionada(value);
                                form.setValue("categoria", value);
                            }}
                            value={categoriaSelecionada}
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
                <Separator className="my-4" />
                <Button type="submit" className="col-span-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Adicionar"}
                </Button>
            </form>
        </Form>
    );
}