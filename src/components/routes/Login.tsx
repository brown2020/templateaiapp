// app/login/page.tsx
"use client"

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schemas";
import { Checkbox } from "@/components/ui/checkbox";
import { isValidCallbackUrl } from "@/utils/url";
import { WEBAPP_URL } from "@/utils/constants";

export function Login() {
    const router = useRouter();
    const { signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const handleForgotPassword = async () => {
        const email = form.getValues("email");
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
        const email = form.getValues("email");
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

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast.success("Successfully signed in!");
            const searchParams = new URLSearchParams(window.location.search);
            const callbackUrl = searchParams.get('callbackUrl');
            await new Promise(resolve => setTimeout(resolve, 200));
            if (callbackUrl && isValidCallbackUrl(callbackUrl, WEBAPP_URL)) {
                router.push(callbackUrl);
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            toast.error(getFirebaseErrorMessage(error));
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true);
            await signInWithGoogle();
            toast.success("Successfully logged in with Google!");
            const searchParams = new URLSearchParams(window.location.search);
            const callbackUrl = searchParams.get('callbackUrl');

            if (callbackUrl && isValidCallbackUrl(callbackUrl, WEBAPP_URL)) {
                router.push(callbackUrl);
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            const error = err as AuthError;
            toast.error(getFirebaseErrorMessage(error));
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <AuthPageLayout
            title="Sign in to your account"
            altLinkText="create a new account"
            altLinkHref="/signup"
        >
            {/* 1) Email & Password form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{
                            required: {
                                value: true,
                                message: "Email is required"
                            }
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <FormInput
                                        id="email"
                                        type="email"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Enter your email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        rules={{
                            required: {
                                value: true,
                                message: "Password is required"
                            }
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <FormInput
                                        id="password"
                                        type="password"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Enter your password"
                                        showPasswordToggle={true}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-between">
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Remember me
                                    </FormLabel>
                                </FormItem>
                            )}
                        />

                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Forgot your password?
                        </button>
                    </div>

                    <Button type="submit" variant="primary" disabled={loading} className="w-full">
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </Form>

            <OrDivider text="Or continue with" />

            {/* 2) Google Sign-In */}
            <SocialSignInButton
                providerName="Google"
                onClick={handleGoogleSignIn}
                loading={isGoogleLoading}
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
            <Button
                type="button"
                onClick={handlePasswordlessSignIn}
                variant="outline"
                className="mt-4 w-full"
            >
                <Mail className="h-5 w-5" />
                Send me a sign-in link
            </Button>
        </AuthPageLayout>
    );
}
