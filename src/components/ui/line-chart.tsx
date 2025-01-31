"use client"

import { CartesianGrid, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface DataPoint {
    [key: string]: unknown;
}

interface LineChartProps {
    data: DataPoint[];
    dataKeys: {
        xAxis: string;
        lines: Array<{
            key: string;
            color: string;
        }>;
    };
    chartConfig: ChartConfig;
    metadata?: {
        title: string;
        description?: string;
    };
    headerComponent?: React.ReactNode;
    className?: string;
    aspectRatio?: number;
}

export function LineChart({ data, dataKeys, chartConfig, metadata, headerComponent, className, aspectRatio = 2 }: LineChartProps) {

    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>{metadata?.title || 'Dynamic Line Chart'}</CardTitle>
                        {metadata?.description && <CardDescription>{metadata?.description}</CardDescription>}
                    </div>
                    {headerComponent && <div className="ml-auto">{headerComponent}</div>}
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                        aspect={aspectRatio}
                    >
                        <RechartsLineChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey={dataKeys.xAxis}
                                tickLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            {dataKeys.lines.map(line => (
                                <Line
                                    key={line.key}
                                    type="monotone"
                                    dataKey={line.key}
                                    stroke={line.color}
                                    dot={{
                                        r: 4,
                                        stroke: line.color,
                                        strokeWidth: 1,
                                    }}
                                    activeDot={{
                                        r: 4,
                                        stroke: line.color,
                                        strokeWidth: 1,
                                        fill: line.color,
                                    }}
                                />
                            ))}
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
