"use client"
import { appConfig } from "@/appConfig";
import { ChartConfig } from "@/components/ui/chart";
import { LineChart } from "@/components/ui/line-chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function UsersChart() {
    const { data, title, description } = appConfig.admin.charts.users;

    return (
        <LineChart
            data={data}
            dataKeys={{
                xAxis: 'month',
                lines: [
                    { key: 'desktop', color: 'hsl(var(--chart-1))' },
                    { key: 'mobile', color: 'hsl(var(--chart-2))' },
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
