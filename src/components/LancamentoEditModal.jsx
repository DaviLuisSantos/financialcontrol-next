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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

import { getCategoriasByUsuario } from "@/services/categoriaService";
import { updateLancamento } from "@/services/lancamentoService";

const FormSchema = z.object({
    descricao: z.string().min(1, { message: "Descrição é obrigatória." }),
    valor: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Insira um valor válido." }),
    data: z.string().min(1, { message: "A data é obrigatória." }),
    categoria: z.string().min(1, { message: "Selecione uma categoria." }),
    tipo: z.enum(["0", "1"], { message: "Selecione o tipo de lançamento." }),
});

export default function LancamentoEditModal({ open, onClose, lancamento, onUpdated }) {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            descricao: lancamento?.descricao || "",
            valor: lancamento?.valor?.toString() || "",
            data: lancamento?.data ? lancamento.data.slice(0, 10) : "",
            categoria: lancamento?.categoriaId?.toString() || "",
            tipo: lancamento?.tipo?.toString() || "",
        },
    });

    useEffect(() => {
        form.reset({
            descricao: lancamento?.descricao || "",
            valor: lancamento?.valor?.toString() || "",
            data: lancamento?.data ? lancamento.data.slice(0, 10) : "",
            categoria: lancamento?.categoriaId?.toString() || "",
            tipo: lancamento?.tipo?.toString() || "",
        });
    }, [lancamento, form]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                setIsLoading(true);
                const data = await getCategoriasByUsuario();
                setCategorias(data || []);
            } catch (error) {
                setError("Não foi possível carregar as categorias.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategorias();
    }, []);

    const handleEditar = async (dados) => {
        try {
            setIsLoading(true);
            await updateLancamento(lancamento.id, {
                ...dados,
                categoriaId: parseInt(dados.categoria),
                tipo: parseInt(dados.tipo),
            });
            if (onUpdated) onUpdated();
            onClose();
        } catch (error) {
            setError("Não foi possível atualizar o lançamento.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Lançamento</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleEditar)}
                        className="grid grid-cols-1 gap-4"
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
                                    onValueChange={(value) => form.setValue("categoria", value)}
                                    value={form.watch("categoria")}
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
                        <div className="flex justify-end gap-2 col-span-full">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}