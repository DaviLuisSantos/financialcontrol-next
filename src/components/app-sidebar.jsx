import { Home, Folder, DollarSign } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Categorias",
        url: "/categoria",
        icon: Folder,
    },
    {
        title: "Lançamentos",
        url: "/lancamento",
        icon: DollarSign,
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="w-64 bg-gradient-to-b from-[#3b3b4f] to-[#44475a] text-[#f8f8f2] shadow-xl fixed h-full">
            <SidebarContent>
                {/* Header Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-bold text-[#bd93f9] mb-4">
                        Financial Control
                    </SidebarGroupLabel>
                    <Separator className="bg-[#6272a4] mb-4" />
                </SidebarGroup>

                {/* Navigation Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sm font-semibold text-[#bd93f9] mb-2">
                        Navegação
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="flex items-center">
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={item.url}
                                            className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#343746] transition-all duration-200 focus:ring-2 focus:ring-[#bd93f9]"
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-sm font-medium">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <Separator className="bg-[#6272a4] my-4" />

                {/* Footer Section */}
                <div className="mt-auto p-4">
                    <Button variant="outline" className="w-full text-sm">
                        Sair
                    </Button>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}