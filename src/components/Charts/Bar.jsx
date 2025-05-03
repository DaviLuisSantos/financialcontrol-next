"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { Badge } from "@/components/ui/badge";

export function BarChartComponent({
    title = "Bar Chart",
    description = "",
    data = [],
    dataKey = "value",
    xAxisKey = "label",
    color = "hsl(var(--chart-1))",
    footerText = "Showing data for the selected period",
    footerIcon = <TrendingUp className="h-4 w-4" />,
    footerSubtext = "",
    decimalVariation = "0.00", // Nova prop para variação decimal
    percentageVariation = "0%", // Nova prop para variação percentual
}) {
    const isPositive = parseFloat(decimalVariation) >= 0;

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-lg font-bold">{title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        {description}
                        <div className="flex items-center gap-4 ">
                            <Badge
                                variant={isPositive ? "success" : "destructive"}
                                className="text-xs px-2 py-0.5" // Tamanho reduzido
                            >
                                {isPositive ? (
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 mr-1" />
                                )}
                                {decimalVariation}
                            </Badge>
                            <Badge
                                variant={isPositive ? "success" : "destructive"}
                                className="text-xs px-2 py-0.5" // Tamanho reduzido
                            >
                                {isPositive ? (
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 mr-1" />
                                )}
                                {percentageVariation}
                            </Badge>
                        </div>
                    </CardDescription>
                </div>

            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <ChartContainer
                    config={{ [dataKey]: { label: title, color } }}
                    className="w-full h-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                        }}
                        className="w-full h-full"
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={xAxisKey}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey={dataKey} fill={color} radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {(footerText || footerSubtext) && (
                <CardFooter className="flex-col gap-2 text-sm">
                    {footerText && (
                        <div className="flex items-center gap-2 font-medium leading-none">
                            {footerText} {footerIcon}
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