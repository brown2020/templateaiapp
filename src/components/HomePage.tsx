"use client";

import { useAuth } from "@/context/AuthContext";
import { appConfig } from "@/appConfig";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Code2, Cloud, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeaturesSection from "./FeaturesSection";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern dark:bg-grid-slate-800/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-violet-600/90 dark:from-blue-900/90 dark:to-violet-900/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28">
          <div className="text-center">
            <Badge
              variant="outline"
              className="bg-white/10 text-white border-white/20 backdrop-blur-sm mb-6 dark:bg-slate-800/20 dark:text-slate-200 dark:border-slate-600"
            >
              ✨ Welcome to the future of development
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-clip-text dark:text-slate-100">
              {appConfig.title}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/80 max-w-3xl mx-auto dark:text-slate-300">
              {appConfig.description}
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  variant="default"
                  className="bg-white text-blue-600 hover:bg-white/90 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-blue-600 hover:bg-white/10 dark:border-slate-600 dark:text-blue-400 dark:hover:bg-slate-800"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}
            {user && (
              <Button
                size="lg"
                variant="default"
                className="bg-white text-blue-600 hover:bg-white/90 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      {!user && (
        <section className="relative pb-24 overflow-hidden">
          {/* Dynamic background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-violet-50/50 dark:from-blue-950/30 dark:to-violet-950/30" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-8 lg:p-12 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 shadow-xl dark:shadow-2xl-white border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Ready to Transform Your Development?
                </h2>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of developers who trust {appConfig.title} for
                  building modern applications with confidence and speed.
                </p>

                <div className="relative inline-block group">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 opacity-50 group-hover:opacity-70 blur transition duration-200" />
                  <Link
                    href="/signup"
                    className="relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Create Your Account
                    <ArrowRight className="w-5 h-5 animate-bounce-x" />
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Enterprise-grade Security
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Lightning-fast Performance
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Active Community
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// function FeatureCard({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <Card className="group hover:shadow-lg transition-all duration-300">
//       <CardContent className="p-6">
//         <div className="bg-blue-50 rounded-lg p-3 w-fit mb-4 group-hover:bg-blue-100 transition-colors">
//           <div className="text-blue-600">{icon}</div>
//         </div>
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//       </CardContent>
//     </Card>
//   );
// }
