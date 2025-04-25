"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
} from "@/components/ui/chart";

export function ReusableLineChart({
    title = "Line Chart",
    description = "",
    data = [],
    dataKey = "value",
    xAxisKey = "label",
    lineLabel = "Line Data",
    footerText = "",
    footerSubtext = "",
    footerIcon: FooterIcon = TrendingUp,
}) {
    // Configuração de cores estáticas
    const lineColor = "#50fa7b"; // Cor estática para a linha
    const dotColor = "#50fa7b"; // Cor estática para os pontos

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <ChartContainer className="w-full h-full">
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                        className="w-full h-full"
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={xAxisKey}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey={dataKey}
                            type="natural"
                            stroke={lineColor}
                            strokeWidth={2}
                            dot={{
                                fill: dotColor,
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
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