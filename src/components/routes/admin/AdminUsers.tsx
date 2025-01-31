"use client";

import React, { useEffect } from 'react';
import { handleError } from '@/utils/errorHandler';
import useAdminStore from '@/zustand/useAdminStore';
import { useAuth } from '@/context/AuthContext';
import { UserCard } from '@/components/admin';
import { UserCardSkeleton } from '@/components/skeletons';
import { useSidebar } from '@/components/ui/sidebar';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/navigation';

export function AdminUsers() {
  const { user } = useAuth();
  const router = useRouter();
  const { setOpen } = useSidebar();
  const { users, fetchUsers, adminLoaders, setAdminLoaders } = useAdminStore();
  const { updateUserRole } = useAuth();

  useEffect(() => {
    setOpen(false);
    if (!user?.uid) return;

    const fetchAllUsers = async () => {
      try {
        setAdminLoaders({ users: true });
        await fetchUsers();
      } catch (error) {
        handleError(error, "Failed to load users");
      } finally {
        setAdminLoaders({ users: false });
      }
    };

    fetchAllUsers();
  }, [user?.uid]);

  const onRoleChange = async (uid: string, isAdmin: boolean) => {
    try {
      setAdminLoaders({ [uid]: true });
      await updateUserRole(uid + "000", isAdmin);
      if (uid == user?.uid) {
        router.push(ROUTES.DASHBOARD);
      }
      await fetchUsers();
    } catch (error) {
      handleError(error, "Failed to make user admin")
    } finally {
      setAdminLoaders({ [uid]: false });
    }
  }
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {adminLoaders.users ? (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </>
        ) : (
          users.map((user) => <UserCard key={user.uid} user={user} onRoleChange={onRoleChange} />)
        )}
      </div>
    </div>
  )
}
