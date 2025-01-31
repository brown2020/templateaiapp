import { AdminContainer } from "@/components/admin";
import { AdminSettings } from "@/components/routes";

export default function AdminSettingsPage() {
    return (
        <AdminContainer className="p-2">
            <AdminSettings />
        </AdminContainer>
    );
}
