import { useState } from "react";
import { Button } from "@/components/ui/button";
import LancamentoForm from "./LancamentoForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function DialogDemo() {
    const [isOpen, setIsOpen] = useState(false);

    const handleFormSubmit = () => {
        // Lógica de submissão do formulário
        setIsOpen(false); // Fecha o modal após a conclusão
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" id="button">Novo Lançamento</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Lançamento</DialogTitle>
                    <DialogDescription>
                        Gerencie seus lançamentos financeiros de forma simples e intuitiva.
                    </DialogDescription>
                </DialogHeader>
                <Separator className="my-4" />
                <div className="flex flex-col gap-4">
                    {/* Força os inputs do LancamentoForm a ficarem em coluna */}
                    <LancamentoForm onSubmit={handleFormSubmit} />
                </div>

            </DialogContent>
        </Dialog>
    );
}