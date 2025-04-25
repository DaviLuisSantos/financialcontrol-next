"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
} from "@/components/ui/chart";

export function ReusablePieChart({
    title = "Pie Chart",
    description = "",
    data = [],
    dataKey = "value",
    nameKey = "name",
    footerText = "",
    footerSubtext = "",
    footerIcon: FooterIcon = TrendingUp,
    chartConfig = {},
}) {
    // Definir cores padrão
    const defaultColors = ['#ff79c6', '#50fa7b', '#bd93f9', '#ffb86c', '#8be9fd'];

    // Adicionar cores padrão aos dados, caso não tenham uma cor definida
    const dataWithColors = data.map((item, index) => ({
        ...item,
        fill: item.fill || defaultColors[index % defaultColors.length],
    }));

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-full"
                >
                    <PieChart className="w-full h-full">
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={dataWithColors} dataKey={dataKey} nameKey={nameKey} />
                        <ChartLegend
                            content={({ payload }) => (
                                <ul className="flex flex-wrap gap-2">
                                    {payload.map((entry, index) => (
                                        <li
                                            key={`item-${index}`}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <span
                                                className="w-4 h-4 rounded-sm"
                                                style={{ backgroundColor: entry.color }}
                                            ></span>
                                            {entry.payload[nameKey]}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            {(footerText || footerSubtext) && (
                <CardFooter className="flex-col gap-2 text-sm">
                    {footerText && (
                        <div className="flex items-center gap-2 font-medium leading-none">
                            {footerText} {FooterIcon && <FooterIcon className="h-4 w-4" />}
                        </div>
                    )}
                    {footerSubtext && (
                        <div className="leading-none text-muted-foreground">
                            {footerSubtext}
                        </div>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}