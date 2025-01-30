"use client";

import { useAuth } from "@/context/AuthContext";
import { appConfig } from "@/appConfig";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FeaturesSection from "./FeaturesSection";
import ReviewsSection from "./ReviewsSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import GrowthSection from "./GrowthSection";
import PricingSection from "./PricingSection";
import { ROUTES } from "@/utils/constants";

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
                  className="bg-white text-blue-600 hover:bg-white/90 dark:bg-white dark:text-blue-600 dark:hover:bg-white/90"
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white hover:bg-white/10 dark:border-slate-600 ho"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}
            {user && (
              <Button
                size="lg"
                variant="default"
                className="bg-white text-blue-600 hover:bg-white/90 dark:bg-white dark:text-blue-600 dark:hover:bg-white/90"
              >
                <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Reviews Section */}
      {appConfig.reviews.visible && <ReviewsSection />}

      {/* Growth Section */}
      {appConfig.features.visible && <GrowthSection />}

      {/* Testimonials Section */}
      {appConfig.testimonials.visible && <TestimonialsSection />}

      {/* CTA Section */}
      {!user && (
        <section className="relative py-8 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
          </div>
          {/* Dynamic background with gradient overlay */}
          <div className="p-8 lg:p-12 bg-gradient-to-r from-blue-600/10 to-violet-600/10 dark:from-blue-900/10 dark:to-violet-900/10 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
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
        </section>
      )
      }

      {/* Pricing Section */}
      {appConfig.pricing.visible && <PricingSection />}

      {/* FAQ Section */}
      {appConfig.help.visible && <FAQSection />}
    </div >
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
