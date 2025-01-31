"use client"
import { ActivityChart, AnalyticsChart, UsersChart } from "@/components/admin"

export function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Users Chart */}
      <UsersChart />
      {/* Analytics Chart */}
      <AnalyticsChart />
      {/* Recent Activity Chart */}
      <ActivityChart />
      {/* Overview Chart */}
      {/* <div className="md:col-span-3 h-[68vh]">
        <div className="h-full">
          <OverviewChart />
        </div>
      </div> */}
    </div>
  )
}
