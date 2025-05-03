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

export function DialogDemo() {
    return (
        <Dialog>
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
                <div className="flex flex-col gap-4">
                    {/* Força os inputs do LancamentoForm a ficarem em coluna */}
                    <LancamentoForm />
                </div>
            </DialogContent>
        </Dialog>
    );
}