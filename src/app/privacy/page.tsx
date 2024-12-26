"use client";

import { Shield, Lock, Eye, Server, Bell, Trash2 } from "lucide-react";
import { appConfig } from "@/appConfig";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
                <p className="mt-2 text-blue-100">
                  Last updated: {appConfig.company.updatedAt.privacy}
                </p>
              </div>
              <Shield className="h-12 w-12 text-blue-100" />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Introduction
              </h2>
              <p className="text-gray-600">
                At {appConfig.company.name}, we take your privacy seriously.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our service.
              </p>
            </section>

            {/* Information Collection */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Information We Collect
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We collect information that you provide directly to us,
                    including:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>Name and contact information</li>
                    <li>Account credentials</li>
                    <li>Profile information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Server className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    How We Use Your Information
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We use the information we collect to:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>Provide and maintain our service</li>
                    <li>Improve user experience</li>
                    <li>Send important notifications</li>
                    <li>Prevent fraud and abuse</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Lock className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Data Security
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We implement appropriate technical and organizational
                    security measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or
                    destruction.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Bell className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Communications
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We may use your email address to send you important updates
                    about our service, including security and operational
                    updates. You may opt out of non-essential communications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Trash2 className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    Data Retention and Deletion
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We retain your information for as long as necessary to
                    provide our services and fulfill the purposes outlined in
                    this policy. You can request deletion of your personal data
                    at any time.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please
                contact us at:
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
