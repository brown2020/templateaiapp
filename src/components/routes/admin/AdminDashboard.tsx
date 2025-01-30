"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-xl bg-muted/50" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-xl bg-muted/50" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-xl bg-muted/50" />
        </CardContent>
      </Card>
      <div className="md:col-span-3">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
