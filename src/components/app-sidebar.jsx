import { Home, Folder, DollarSign, Search, Settings } from "lucide-react";

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

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home, // Ícone para Home
    },
    {
        title: "Categorias",
        url: "/categoria",
        icon: Folder, // Ícone para Categorias
    },
    {
        title: "Lançamentos",
        url: "/lancamento",
        icon: DollarSign, // Ícone para Lançamentos
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="w-64 bg-gradient-to-b from-[#3b3b4f] to-[#44475a] text-[#f8f8f2] shadow-xl fixed h-full">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-bold text-[#bd93f9] mb-4">
                        Financial Control
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="flex items-center">
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={item.url}
                                            className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#343746] transition-all duration-200"
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
            </SidebarContent>
        </Sidebar>
    );
}