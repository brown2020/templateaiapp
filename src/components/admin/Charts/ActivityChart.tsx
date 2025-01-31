"use client"
import { appConfig } from "@/appConfig";
import { ChartConfig } from "@/components/ui/chart";
import { LineChart } from "@/components/ui/line-chart"

const chartConfig = {
    auth: {
        label: "Authentication",
        color: "hsl(var(--chart-4))",
    },
    profile: {
        label: "Profile",
        color: "hsl(var(--chart-5))",
    },
    settings: {
        label: "Settings",
        color: "hsl(var(--chart-7))",
    },
    interaction: {
        label: "Interactions",
        color: "hsl(var(--chart-8))",
    },
} satisfies ChartConfig

export function ActivityChart() {
    const { data, title, description } = appConfig.admin.charts.activity;

    return (
        <LineChart
            data={data}
            dataKeys={{
                xAxis: 'month',
                lines: [
                    { key: 'auth', color: 'hsl(var(--chart-4))' },
                    { key: 'profile', color: 'hsl(var(--chart-5))' },
                    { key: 'settings', color: 'hsl(var(--chart-7))' },
                    { key: 'interaction', color: 'hsl(var(--chart-8))' },
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
