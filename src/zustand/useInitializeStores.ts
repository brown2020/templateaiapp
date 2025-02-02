import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";
import useProfileStore from "./useProfileStore";

let renderCount = 0;

export const useInitializeStores = () => {
  const uid = useAuthStore((state) => state.uid);

  const fetchProfile = useProfileStore((state) => state.fetchProfile);

  console.log("useInitializeStores renderCount", renderCount++);

  // Effect to initialize core data
  useEffect(() => {
    if (!uid) return;

    fetchProfile();
  }, [uid, fetchProfile]);
};
