"use client";

import { useAuth } from "@/context/AuthContext";
import { appConfig } from "@/appConfig";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Code2, Cloud } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {appConfig.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {appConfig.description}
            </p>
            {!user && (
              <div className="flex justify-center gap-4">
                <Link
                  href="/signup"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
            {user && (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose {appConfig.title}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Secure"
              description="Built with security best practices and user privacy in mind"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Fast"
              description="Optimized performance for the best user experience"
            />
            <FeatureCard
              icon={<Code2 className="w-6 h-6" />}
              title="Modern Stack"
              description="Built with Next.js, TypeScript, and Tailwind CSS"
            />
            <FeatureCard
              icon={<Cloud className="w-6 h-6" />}
              title="Scalable"
              description="Cloud-native architecture that grows with your needs"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who trust {appConfig.title} for their
              needs.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Your Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
