"use client";

import { useEffect } from "react";
import { useToastStore } from "@/zustand/useToastStore";
import { XIcon } from "lucide-react";

const toastStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
};

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, removeToast]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${
            toastStyles[toast.type]
          } text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] max-w-md`}
        >
          <p className="mr-4">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-white/20 rounded-full"
          >
            <XIcon size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
