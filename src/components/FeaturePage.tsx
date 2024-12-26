"use client";

import { appConfig } from "@/appConfig";
import { Zap, TrendingUp, Users, LineChart } from "lucide-react";

export default function FeaturePage() {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: appConfig.feature.benefits[0],
      description: "Optimize your workflow and save valuable time",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: appConfig.feature.benefits[1],
      description: "Boost your productivity with smart automation",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: appConfig.feature.benefits[2],
      description: "Work together seamlessly with your team",
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: appConfig.feature.benefits[3],
      description: "Make informed decisions with powerful analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {appConfig.feature.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {appConfig.feature.description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">See It In Action</h2>
            <div className="bg-gray-100 rounded-lg p-8">
              {/* Placeholder for demo/screenshot */}
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Demo Video/Screenshot</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
