"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    User,
    Settings,
    Mail,
    Phone,
    MapPin,
    Calendar,
    LogOut,
    CreditCard,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useProfileStore from "@/zustand/useProfileStore";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { profileFormSchema } from "@/schemas/profile.schema";
import FormInput from "@/components/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { UserSessionCard } from "../UserSessionCard";
import { useAuthStore } from "@/zustand/useAuthStore";

export function Profile() {
    const [loading, setLoading] = useState(false);
    const { user, signOut, metadata, signOutSession, removeSession } = useAuth();
    const sessions = useAuthStore((state) => state.sessions);
    const router = useRouter();
    const {
        profile: storeProfile,
        fetchProfile,
        updateProfile,
    } = useProfileStore();

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            displayName: storeProfile.displayName || "",
            email: storeProfile.email || "",
            phone: storeProfile.phone || "",
            location: storeProfile.location || "",
            bio: storeProfile.bio || "",
        },
    });

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }
        fetchProfile();
    }, [user, router, fetchProfile]);

    useEffect(() => {
        form.reset({
            displayName: storeProfile.displayName,
            email: storeProfile.email,
            phone: storeProfile.phone,
            location: storeProfile.location,
            bio: storeProfile.bio,
        });
    }, [storeProfile]);

    const handleUpdateProfile = async (values: z.infer<typeof profileFormSchema>) => {
        if (!user?.uid) {
            toast.error("No user found");
            return;
        }

        setLoading(true);
        try {
            await updateProfile({
                ...values,
                updatedAt: new Date(),
            });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Signed out successfully");
            router.push("/login");
        } catch (error) {
            toast.error("Failed to sign out");
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-2 sm:py-12 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    {/* Profile Header */}
                    <div className="px-3 py-4 sm:px-6 sm:py-5 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                            <div className="flex items-center">
                                {metadata?.photoURL ? (
                                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                                        <AvatarImage src={metadata?.photoURL} alt="Profile" />
                                        <AvatarFallback>
                                            {metadata.displayName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-300" />
                                    </div>
                                )}
                                <div className="ml-3 sm:ml-4">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                        Profile Settings
                                    </h1>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                        Manage your account preferences
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={handleSignOut}
                                size="sm"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="px-3 py-4 sm:p-6">
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <FormInput
                                                        id="email"
                                                        type="email"
                                                        value={field.value}
                                                        onChange={field.onChange} disabled
                                                        className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100" />
                                                </FormControl>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Your email address is your unique identifier and cannot be changed.
                                                </p>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="max-sm:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="displayName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                    Display Name
                                                </FormLabel>
                                                <FormControl>
                                                    <FormInput
                                                        id="displayName"
                                                        type="text"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="max-sm:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                    Phone Number
                                                </FormLabel>
                                                <FormControl>
                                                    <FormInput id="phone" type="tel" value={field.value || ""}
                                                        onChange={field.onChange}
                                                        className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="max-sm:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                                    Location
                                                </FormLabel>
                                                <FormControl>
                                                    <FormInput
                                                        id="location"
                                                        type="text"
                                                        value={field.value || ""}
                                                        onChange={field.onChange}
                                                        className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="max-sm:col-span-2">
                                    <FormLabel className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                        Member Since
                                    </FormLabel>
                                    <FormInput id="joinedDate" value={moment(user?.metadata.creationTime).format('LLL')} onChange={() => { }} className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100" disabled />
                                </div>

                                <div className="max-sm:col-span-2">
                                    <FormLabel className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                        Last Login
                                    </FormLabel>
                                    <FormInput
                                        id="lastLoginDate"
                                        value={moment(user?.metadata.lastSignInTime).format('LLL')}
                                        onChange={() => { }}
                                        className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100" disabled />
                                </div>

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        rows={4}
                                                        placeholder="Tell us a little about yourself..."
                                                        className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-gray-100"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={loading}
                                        loading={loading}
                                    >
                                        {loading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>

                    {/* Credits Display Section */}
                    <div className="px-3 py-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
                            Your Credits
                        </h2>
                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{storeProfile.credits}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Available Credits</span>
                                </div>
                                <div className="mt-4">
                                    <Button
                                        variant="outline"
                                        size="xs"
                                        className="text-blue-600 hover:text-blue-700 border-blue-600 hover:border-blue-700 dark:text-blue-400 dark:hover:text-blue-500 dark:border-blue-400 dark:hover:border-blue-500"
                                    >
                                        Buy More Credits
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Active Sessions */}
                    <div className="px-3 py-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
                            Active Sessions
                        </h2>
                        <div className="space-y-4">
                            {sessions?.sort((a, b) => b.currentSession ? 1 : a.currentSession ? -1 : 0).map((session, index) => (
                                <UserSessionCard session={session} key={index} onSignOut={signOutSession} onRemove={removeSession} />
                            ))}
                        </div>
                    </div>

                    {/* Account Settings Section */}
                    <div className="px-3 py-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
                            Account Settings
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        Email Notifications
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Receive email updates about your account
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <Switch
                                        id="email-notifications"
                                        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                                    />
                                </label>
                            </div>

                            <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        Two-Factor Authentication
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Add an extra layer of security to your account
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <Switch
                                        id="email-notifications"
                                        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
