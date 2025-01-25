"use client"

import { appConfig } from "@/appConfig";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

const { pricing } = appConfig;

export default function PricingSection() {
    const { user } = useAuth();
    const router = useRouter();
    const [interval, setInterval] = useState<"month" | "year">("month")

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
        <section className="relative overflow-hidden py-12">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between max-sm:flex-col max-sm:items-center">
                    {/* Section Header */}
                    <div className="relative text-left mb-5">
                        <h2 className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            PRICING PLANS
                            <span className="ml-2 w-12 h-px bg-blue-600 dark:bg-blue-400"></span>
                        </h2>
                        <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                            Choose Your Perfect Plan
                        </h3>
                    </div>
                    <Tabs defaultValue="month" onValueChange={(value) => setInterval(value as "month" | "year")}>
                        <TabsList className="grid w-[150px] grid-cols-2 bg-slate-100 dark:bg-slate-800">
                            <TabsTrigger value="month" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-50">Monthly</TabsTrigger>
                            <TabsTrigger value="year" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-50">Yearly</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-3">
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
        </section>
    );
}

interface PricingCardProps {
    name: string
    description: string
    price: number
    interval: "month" | "year"
    features: string[]
    cta: string
    highlighted: boolean
    onClick: () => void
}

export const PricingCard = ({ name, description, price, interval, features, cta, highlighted, onClick }: PricingCardProps) => {
    return (
        <Card
            className={`relative flex flex-col ${highlighted ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" : "bg-card text-card-foreground"
                }`}
        >
            {highlighted && (
                <Badge variant="secondary" className="text-white bg-white/30 absolute top-3 right-3 backdrop-blur-sm hover:bg-white/30 hover:backdrop-blur-sm">
                    <Star className="mr-1 h-4 w-4 text-yellow-400" />
                    Most Popular
                </Badge>
            )}
            <CardHeader>
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="text-sm opacity-80">{description}</p>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="mb-6">
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="ml-1 text-sm opacity-80">/{interval}</span>
                </div>
                <ul className="space-y-2">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                            <Check className={`h-5 w-5 ${highlighted ? "text-blue-100" : "text-green-500 dark:text-green-400"}`} />
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    className={`w-full ${highlighted
                        ? "bg-white text-blue-600 hover:bg-white/90 dark:bg-white dark:text-primary-foreground dark:hover:bg-white/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                        }`}
                    onClick={onClick}
                >
                    {cta}
                </Button>
            </CardFooter>
        </Card>
    )
}
