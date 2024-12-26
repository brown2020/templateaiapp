"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardComponent from "@/components/DashboardComponent";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <DashboardComponent />
      </div>
    </ProtectedRoute>
  );
}
