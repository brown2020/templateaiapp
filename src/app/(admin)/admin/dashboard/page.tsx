import { AdminContainer } from "@/components/admin";
import { AdminDashboard } from "@/components/routes";

export default function AdminDashboardPage() {
    return (
        <AdminContainer className="p-2">
            <AdminDashboard />
        </AdminContainer>
    );
}
