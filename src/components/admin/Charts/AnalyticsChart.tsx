"use client"
import { appConfig } from "@/appConfig";
import { ChartConfig } from "@/components/ui/chart";
import { LineChart } from "@/components/ui/line-chart"

const chartConfig = {
    page_views: {
        label: "Page Views",
        color: "hsl(var(--chart-4))",
    },
    unique_visitors: {
        label: "Unique Visitors",
        color: "hsl(var(--chart-5))",
    },
    bounce_rate: {
        label: "Bounce Rate",
        color: "hsl(var(--chart-6))",
    },
} satisfies ChartConfig

export function AnalyticsChart() {
    const { data, title, description } = appConfig.admin.charts.analytics;

    return (
        <LineChart
            data={data}
            dataKeys={{
                xAxis: 'month',
                lines: [
                    { key: 'page_views', color: 'hsl(var(--chart-4))' },
                    { key: 'unique_visitors', color: 'hsl(var(--chart-5))' },
                    { key: 'bounce_rate', color: 'hsl(var(--chart-6))' },
                ],
            }}
            chartConfig={chartConfig}
            metadata={{
                title: title,
                description: description,
            }}
        />
    )
}
