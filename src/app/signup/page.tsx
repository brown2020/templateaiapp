// app/signup/page.tsx

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sendSignInLinkToEmail } from "firebase/auth";
import { Mail } from "lucide-react";

import { auth } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { appConfig } from "@/appConfig";
import { getFirebaseErrorMessage } from "@/utils/errorHandler";

import { AuthPageLayout } from "@/components/AuthPageLayout";
import FormInput from "@/components/FormInput"; // your existing component
import { OrDivider } from "@/components/OrDivider";
import { SocialSignInButton } from "@/components/SocialSignInButton";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordlessSignUp = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }
    try {
      setLoading(true);
      const actionCodeSettings = {
        url: `${window.location.origin}/loginfinish`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem(appConfig.storage.emailSave, email);
      toast.success("Check your email for the sign-in link!");
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Account created successfully with Google!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageLayout
      title="Create your account"
      altLinkText="sign in to existing account"
      altLinkHref="/login"
    >
      {/* 1) Email + Passwordless sign-up */}
      <FormInput
        id="email"
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
        required
      />

      <button
        type="button"
        onClick={handlePasswordlessSignUp}
        disabled={loading}
        className="mt-2 w-full flex justify-center items-center gap-2 py-2 px-4
                   border-2 border-blue-600 rounded-md text-blue-600 hover:bg-blue-50"
      >
        <Mail className="h-5 w-5" />
        Send me a sign-up link
      </button>

      <OrDivider text="Or sign up with password" />

      {/* 2) Form with password fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Create a password"
          required
        />

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm your password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4
                     border border-transparent text-sm font-medium rounded-md
                     text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <OrDivider text="Or continue with" />

      {/* 3) Google Sign-In */}
      <SocialSignInButton
        providerName="Google"
        onClick={handleGoogleSignIn}
        loading={loading}
        providerIcon={
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            {/* same Google SVG paths */}
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37
                     -1.04 2.53 -2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66
                     -2.23 1.06 -3.71 1.06 -2.86 0 -5.29-1.93 -6.16-4.53H2.18v2.84
                     C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43
                     .35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45
                     1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15
                     C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07
                     l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        }
      >
        Sign up with Google
      </SocialSignInButton>
    </AuthPageLayout>
  );
}
