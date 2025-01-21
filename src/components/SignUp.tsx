// app/signup/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sendSignInLinkToEmail } from "firebase/auth";
import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { auth } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { appConfig } from "@/appConfig";
import { getFirebaseErrorMessage } from "@/utils/errorHandler";

import { AuthPageLayout } from "@/components/AuthPageLayout";
import FormInput from "@/components/FormInput"; // your existing component
import { OrDivider } from "@/components/OrDivider";
import { SocialSignInButton } from "@/components/SocialSignInButton";
import { signUpSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./LoadingSpinner";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [sendingLink, setSendingLink] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter();
    const { signUp, signInWithGoogle } = useAuth();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        console.log(values);
        setLoading(true);
        try {
            await signUp(values.email, values.password);
            console.log(values);
            toast.success("Account created successfully!");
            router.push("/dashboard");
        } catch (error) {
            toast.error(getFirebaseErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };


    const handlePasswordlessSignUp = async () => {
        const email = form.getValues("email");

        if (!email) {
            toast.error("Please enter your email address first");
            return;
        }
        try {
            setSendingLink(true);
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
            setSendingLink(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await signInWithGoogle();
            toast.success("Account created successfully with Google!");
            router.push("/dashboard");
        } catch (error) {
            toast.error(getFirebaseErrorMessage(error));
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <AuthPageLayout
            title="Create your account"
            altLinkText="sign in to existing account"
            altLinkHref="/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* 1) Email + Passwordless sign-up */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FormInput
                                        id="email"
                                        type="email"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Enter your email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="button"
                        onClick={handlePasswordlessSignUp}
                        disabled={sendingLink}
                        loading={sendingLink}
                        variant="outline"
                        className="mt-4 w-full"
                    >
                        <Mail className="h-5 w-5" />
                        Send me a sign-in link
                    </Button>
                    <OrDivider text="Or sign up with password" />

                    {/* 2) Form with password fields */}

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FormInput
                                        id="password"
                                        type="password"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Create a password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FormInput
                                        id="confirmPassword"
                                        type="password"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Confirm your password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                        variant="primary"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </Button>
                </form>
            </Form>

            <OrDivider text="Or continue with" />

            {/* 3) Google Sign-In */}
            <SocialSignInButton
                providerName="Google"
                onClick={handleGoogleSignIn}
                loading={isGoogleLoading}
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
