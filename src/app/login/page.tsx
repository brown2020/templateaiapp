// app/login/page.tsx

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  AuthError,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Mail } from "lucide-react";

import { auth } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { appConfig } from "@/appConfig";
import { getFirebaseErrorMessage } from "@/utils/errorHandler";

import { AuthPageLayout } from "@/components/AuthPageLayout";
import FormInput from "@/components/FormInput"; // your existing component
import { OrDivider } from "@/components/OrDivider";
import { SocialSignInButton } from "@/components/SocialSignInButton";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox");
    } catch (err) {
      const error = err as AuthError;
      toast.error(error.message || "Failed to send reset email");
    }
  };

  const handlePasswordlessSignIn = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/loginfinish`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem(appConfig.storage.emailSave, email);
      toast.success("Check your email for the sign-in link!");
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully signed in!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      toast.success("Successfully logged in with Google!");
      router.push("/dashboard");
    } catch (err) {
      const error = err as AuthError;
      toast.error(error.message || "Failed to log in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageLayout
      title="Sign in to your account"
      altLinkText="create a new account"
      altLinkHref="/signup"
    >
      {/* 1) Email & Password form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          required
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          required
        />

        {/* "Remember me" & "Forgot password?" */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent
                     text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <OrDivider text="Or continue with" />

      {/* 2) Google Sign-In */}
      <SocialSignInButton
        providerName="Google"
        onClick={handleGoogleSignIn}
        loading={loading}
        providerIcon={
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            {/* same Google SVG paths */}
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57
                     c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93
                     -6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55
                     1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1
                     7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        }
      >
        Sign in with Google
      </SocialSignInButton>

      {/* 3) Passwordless Sign-In (via email link) */}
      <button
        type="button"
        onClick={handlePasswordlessSignIn}
        className="mt-4 w-full flex justify-center items-center gap-2 py-2 px-4
                   border-2 border-blue-600 rounded-md text-blue-600 hover:bg-blue-50"
      >
        <Mail className="h-5 w-5" />
        Send me a sign-in link
      </button>
    </AuthPageLayout>
  );
}
