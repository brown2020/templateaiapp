"use client";

import { CreditCard, Check, Star, Zap } from "lucide-react";
import { appConfig } from "@/appConfig";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handlePlanSelect = (plan: (typeof appConfig.pricing.plans)[0]) => {
    if (!user && plan.name !== "Free") {
      router.push("/signup");
    } else {
      // Handle plan selection/upgrade
      console.log("Selected plan:", plan.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
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

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {appConfig.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.highlighted
                  ? "border-2 border-blue-500 relative bg-white"
                  : "border border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                <h2 className="text-xl leading-6 font-semibold text-gray-900">
                  {plan.name}
                </h2>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{plan.interval}
                  </span>
                </p>
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`mt-8 block w-full py-2 px-4 border border-transparent rounded-md text-sm font-semibold text-center ${
                    plan.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide">
                  What&apos;s included
                </h3>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Enterprise Solutions
              </h2>
            </div>
            <p className="mt-4 text-gray-600">
              Need a custom solution? We offer tailored enterprise plans with
              additional features, dedicated support, and flexible pricing
              options. Contact our sales team to learn more about how we can
              help your business grow.
            </p>
            <div className="mt-6">
              <a
                href={`mailto:${appConfig.company.email}`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
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
