"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

export function Features() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user]);

    // if (!user) {
    //   return null;
    // }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                        <Sparkles className="h-8 w-8 text-blue-500" />
                        Core Feature
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Welcome to the main feature of our application
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Zap className="h-6 w-6 text-yellow-500" />
                                Feature Highlights
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <ArrowRight className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        Powerful feature description one
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ArrowRight className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        Amazing capability description two
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ArrowRight className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        Innovative functionality description three
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Quick Actions
                            </h3>
                            <div className="space-y-4">
                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                                    Action One
                                </button>
                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                                    Action Two
                                </button>
                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                                    Action Three
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Feature Details
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        This is where you would implement the core functionality of your
                        application. The feature page is protected and only accessible to
                        authenticated users.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Customize this page to showcase your application&apos;s main
                        features and functionality.
                    </p>
                </div>
            </div>
        </div>
    );
}
