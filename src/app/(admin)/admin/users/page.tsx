import { AdminContainer } from "@/components/admin";
import { AdminUsers } from "@/components/routes";
import { CardTitle } from "@/components/ui/card";

export default function AdminUsersPage() {
    return (
        <AdminContainer
            header={
                <CardTitle>Users</CardTitle>
            }>
            <AdminUsers />
        </AdminContainer>
    );
}
