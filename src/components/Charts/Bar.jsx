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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

export function BarChartComponent({
    title = "Bar Chart",
    description = "",
    data = [],
    config = {}, // Nova prop para configuração de múltiplas barras
    xAxisKey = "label",
    footerText = "Showing data for the selected period",
    footerIcon = <TrendingUp className="h-4 w-4" />,
    footerSubtext = "",
    decimalVariation = "0.00",
    percentageVariation = "0%",
}) {
    const isPositive = parseFloat(decimalVariation) >= 0;

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-lg font-bold">{title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        {description}
                        <div className="flex items-center gap-4">
                            <Badge
                                variant={isPositive ? "success" : "destructive"}
                                className="text-xs px-2 py-0.5"
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
                                className="text-xs px-2 py-0.5"
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
                <ChartContainer config={config} className="w-full h-full">
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
                        <ChartLegend content={<ChartLegendContent />} />
                        {Object.keys(config).map((key) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                //stackId="a"
                                fill={config[key].color}
                            >
                            </Bar>
                        ))}
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