"use client";

import {
  Scale,
  FileText,
  Users,
  AlertCircle,
  HelpCircle,
  Zap,
} from "lucide-react";
import { appConfig } from "@/appConfig";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Terms of Service</h1>
                <p className="mt-2 text-blue-100">
                  Last updated: {appConfig.company.updatedAt.terms}
                </p>
              </div>
              <Scale className="h-12 w-12 text-blue-100" />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Agreement to Terms
              </h2>
              <p className="text-gray-600">
                By accessing or using {appConfig.company.name}&apos;s services,
                you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of
                these terms, you are prohibited from using or accessing our
                service.
              </p>
            </section>

            {/* Terms Sections */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Use License
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We grant you a limited, non-exclusive, non-transferable,
                    revocable license to use our service for personal,
                    non-commercial purposes.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>You must not modify or copy our materials</li>
                    <li>
                      You must not use the materials for commercial purposes
                    </li>
                    <li>
                      You must not attempt to decompile or reverse engineer any
                      software
                    </li>
                    <li>
                      Your license will terminate if you violate any of these
                      restrictions
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    User Responsibilities
                  </h3>
                  <p className="mt-2 text-gray-600">
                    As a user of our service, you are responsible for:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>Maintaining the security of your account</li>
                    <li>All activities that occur under your account</li>
                    <li>Ensuring your use complies with all applicable laws</li>
                    <li>
                      Notifying us of any unauthorized use of your account
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <AlertCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Limitations
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {appConfig.company.name} shall not be held liable for any
                    damages that result from the use of our service. This
                    includes but is not limited to:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>Direct, indirect, or consequential damages</li>
                    <li>Loss of data or business interruption</li>
                    <li>Loss of profits or business opportunities</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Service Modifications
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We reserve the right to modify or discontinue our service at
                    any time without notice. We shall not be liable to you or
                    any third party for any modification, suspension, or
                    discontinuance of the service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <HelpCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Support and Questions
                  </h3>
                  <p className="mt-2 text-gray-600">
                    If you have any questions about these Terms, please contact
                    our support team. We are here to help you understand your
                    rights and responsibilities.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600">
                Questions about the Terms of Service should be sent to:
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">{appConfig.company.name}</p>
                <p className="text-gray-600">{appConfig.company.address}</p>
                <p className="text-gray-600">{appConfig.company.location}</p>
                <p className="text-gray-600">
                  Email:{" "}
                  <a
                    href={`mailto:${appConfig.company.email}`}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    {appConfig.company.email}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
