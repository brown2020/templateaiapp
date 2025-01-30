"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AdminUsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Demo User 1</h3>
            <p className="text-sm text-muted-foreground">admin@example.com</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Demo User 2</h3>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
