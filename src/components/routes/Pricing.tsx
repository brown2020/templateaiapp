"use client";

import { CreditCard, Zap } from "lucide-react";
import { appConfig } from "@/appConfig";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { PricingCard } from "../PricingSection";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import toast from "react-hot-toast";

export function Pricing() {
    const [interval, setInterval] = useState<"month" | "year">("month")
    const { user } = useAuth();
    const router = useRouter();
    const { pricing } = appConfig;

    const handlePlanSelect = (plan: (typeof appConfig.pricing.plans)[0]) => {
        if (!user && plan.name !== "Free") {
            router.push("/signup");
        } else {
            // Handle plan selection/upgrade
            console.log("Selected plan:", plan.name);
            toast.success(`Selected plan: ${plan.name}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                        <div className="flex items-center justify-center gap-3">
                            <CreditCard className="h-12 w-12 text-blue-100" />
                            <div>
                                <h1 className="text-3xl font-bold">Pricing Plans</h1>
                                <p className="mt-2 text-blue-100">
                                    Choose the perfect plan for your needs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 space-y-4 sm:mt-16">
                    <Tabs defaultValue="month" onValueChange={(value) => setInterval(value as "month" | "year")} className="flex justify-center">
                        <TabsList className="grid w-[150px] grid-cols-2 bg-slate-100 dark:bg-slate-800">
                            <TabsTrigger value="month" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-50">Monthly</TabsTrigger>
                            <TabsTrigger value="year" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-50">Yearly</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className=" sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
                        {pricing.plans.map((plan) => (
                            <PricingCard
                                key={plan.name}
                                name={plan.name}
                                description={plan.description}
                                price={plan.price[interval]}
                                interval={interval}
                                features={plan.features}
                                cta={plan.cta}
                                highlighted={plan.highlighted}
                                onClick={() => handlePlanSelect(plan)}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-12 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <div className="flex items-center gap-3">
                            <Zap className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Enterprise Solutions
                            </h2>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Need a custom solution? We offer tailored enterprise plans with
                            additional features, dedicated support, and flexible pricing
                            options. Contact our sales team to learn more about how we can
                            help your business grow.
                        </p>
                        <div className="mt-6">
                            <a
                                href={`mailto:${appConfig.company.email}`}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
