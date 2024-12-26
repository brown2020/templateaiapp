"use client";

import { useState } from "react";
import { appConfig } from "@/appConfig";
import { HelpCircle, ChevronDown, ChevronUp, Search } from "lucide-react";

export default function HelpComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const filteredSections = appConfig.help.sections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Help Center
                </h1>
                <p className="text-sm text-gray-500">
                  Find answers to common questions and learn how to use our
                  platform
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Help Content */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {filteredSections.map((section) => (
                <div
                  key={section.title}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h2 className="text-lg font-medium text-gray-900">
                      {section.title}
                    </h2>
                    {openSections[section.title] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openSections[section.title] && (
                    <div className="mt-4 space-y-4">
                      {section.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 space-y-2"
                        >
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.question}
                          </h3>
                          <p className="text-sm text-gray-500">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500 text-center">
              Can&apos;t find what you&apos;re looking for?{" "}
              <a
                href={`mailto:${appConfig.company.email}`}
                className="text-blue-600 hover:text-blue-500"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
