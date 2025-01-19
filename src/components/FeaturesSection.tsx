"use client";

import { Shield, Zap, Code2, Cloud, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/appConfig";

export default function FeaturesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="relative text-center mb-20">
          <h2 className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
            POWERFUL FEATURES
            <span className="ml-2 w-12 h-px bg-blue-600 dark:bg-blue-400"></span>
          </h2>
          <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Why Choose {appConfig.title}?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Experience the perfect blend of power and simplicity with our modern
            development platform built for the future.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Shield className="w-7 h-7" />}
            title="Enterprise Security"
            description="Bank-grade security with end-to-end encryption and advanced threat protection"
            color="blue"
          />
          <FeatureCard
            icon={<Zap className="w-7 h-7" />}
            title="Lightning Fast"
            description="Optimized performance with sub-second response times and global CDN"
            color="amber"
          />
          <FeatureCard
            icon={<Code2 className="w-7 h-7" />}
            title="Modern Tech Stack"
            description="Built with Next.js 14, TypeScript, and Tailwind CSS for maximum developer productivity"
            color="purple"
          />
          <FeatureCard
            icon={<Cloud className="w-7 h-7" />}
            title="Cloud Native"
            description="Infinitely scalable architecture that adapts to your business needs"
            color="emerald"
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Button variant="outline" size="lg" className="group">
            Explore All Features
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "amber" | "purple" | "emerald";
}) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900/50",
    amber:
      "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900 hover:bg-amber-100 dark:hover:bg-amber-900/50",
    purple:
      "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900 hover:bg-purple-100 dark:hover:bg-purple-900/50",
    emerald:
      "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
  };

  return (
    <Card className="group relative overflow-hidden border-transparent transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg/25 hover:-translate-y-1 bg-white dark:bg-gray-900">
      <CardContent className="p-6">
        <div
          className={`inline-flex rounded-xl p-3 ${colorClasses[color]} transition-colors duration-200`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
        <div className="mt-4 flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 opacity-0 -translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0">
          Learn more
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
