"use client";

import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { appConfig } from "@/appConfig";
import { Building2, Mail, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <Image
            className="mx-auto w-32 h-32 rounded-lg shadow-lg mb-6"
            src={logo}
            alt={appConfig.title}
            width={128}
            height={128}
            priority={true}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {appConfig.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {appConfig.description}
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">About Us</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Building2 className="w-5 h-5" />
              <div>
                <p className="font-medium">{appConfig.company.name}</p>
                <p>{appConfig.company.address}</p>
                <p>{appConfig.company.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <a
                href={`mailto:${appConfig.company.email}`}
                className="hover:text-blue-600"
              >
                {appConfig.company.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Globe className="w-5 h-5" />
              <a
                href={appConfig.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                {appConfig.company.website}
              </a>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Technology</h2>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-4">
              Built with modern technologies and best practices in mind:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Next.js for server-side rendering and optimal performance</li>
              <li>
                TypeScript for type safety and better development experience
              </li>
              <li>Tailwind CSS for beautiful, responsive designs</li>
              <li>Firebase for authentication and real-time features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
