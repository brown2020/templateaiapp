"use client"
import { appConfig } from "@/appConfig";
import { ChartConfig } from "@/components/ui/chart";
import { LineChart } from "@/components/ui/line-chart"

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-4))",
    },
    active_users: {
        label: "Active Users",
        color: "hsl(var(--chart-5))",
    },
    projects: {
        label: "Projects",
        color: "hsl(var(--chart-7))",
    },
    tasks_completed: {
        label: "Tasks Completed",
        color: "hsl(var(--chart-8))",
    },
} satisfies ChartConfig

export function OverviewChart() {
    const { data, title, description } = appConfig.admin.charts.overview;

    return (
        <LineChart
            data={data}
            dataKeys={{
                xAxis: 'month',
                lines: [
                    { key: 'revenue', color: 'hsl(var(--chart-4))' },
                    { key: 'active_users', color: 'hsl(var(--chart-5))' },
                    { key: 'projects', color: 'hsl(var(--chart-7))' },
                    { key: 'tasks_completed', color: 'hsl(var(--chart-8))' },
                ],
            }}
            chartConfig={chartConfig}
            metadata={{
                title: title,
                description: description,
            }}
            className="h-full w-full"
            aspectRatio={3}
        />
    )
}
