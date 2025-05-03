'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const FormSchema = z.object({
    nome: z.string().min(1, { message: "O nome da categoria é obrigatório." }),
});

export default function CategoriaForm({ onSubmit, categoria }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nome: categoria?.nome || "",
        },
    });

    const handleSubmit = (data) => {
        onSubmit(data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mb-6 flex flex-col space-y-4 p-6 shadow-lg rounded-lg bg-gradient-to-r from-[#3b3b4f] to-[#44475a]"
            >
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da Categoria</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite o nome da categoria"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    id="button"
                >
                    Adicionar Categoria
                </Button>
            </form>
        </Form>
    );
}