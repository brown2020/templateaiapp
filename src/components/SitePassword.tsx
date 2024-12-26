import { appConfig } from "@/appConfig";
import { useAuthStore } from "@/zustand/useAuthStore";
import { FormEvent, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function SitePassword() {
  const [password, setPassword] = useState<string>("");
  const [checking, setChecking] = useState(false);
  const setAuthDetails = useAuthStore((state) => state.setAuthDetails);

  useEffect(() => {
    const passwordPassed = window.localStorage.getItem(
      appConfig.storage.passwordPassed
    );
    if (passwordPassed === "True") {
      setAuthDetails({ isAllowed: true });
    }
  }, [setAuthDetails]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setAuthDetails({ isAllowed: false });
      setChecking(true);

      const response = await fetch("/api/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error("Error checking password.");
      } else if (data.success) {
        setAuthDetails({ isAllowed: true });
        window.localStorage.setItem(appConfig.storage.passwordPassed, "True");
      } else {
        throw new Error("Incorrect Password");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        window.alert(error.message);
      } else {
        console.error("An unexpected error occurred:", error);
        window.alert("An unexpected error occurred.");
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-full max-w-sm mx-auto space-y-3"
    >
      <input
        className="w-full px-3 py-2 text-black border rounded-md outline-none bg-slate"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Site Password"
      />
      <button
        className="btn btn-primary w-full h-10"
        type="submit"
        disabled={!password}
      >
        {checking ? <PulseLoader color="#fff" size={10} /> : "Enter"}
      </button>
    </form>
  );
}
