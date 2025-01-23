"use client"

import { appConfig } from "@/appConfig";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem, FAQSection } from "@/types/home";

export default function FAQSection() {
    const [openItem, setOpenItem] = useState<number | null>(null);
    const faqItems = appConfig.help.sections.flatMap((section: FAQSection) =>
        section.items.filter((item: FAQItem) => item.displayInLanding)
    );
    return (
        <section className="relative overflow-hidden pb-10">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row lg:gap-12">
                    {/* Left column with heading */}
                    <div className="lg:w-1/3 mb-8 lg:mb-0 lg:sticky lg:top-8 lg:self-start">
                        <h2 className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            FAQ
                            <span className="ml-2 w-12 h-px bg-blue-600 dark:bg-blue-400"></span>
                        </h2>
                        <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                            Frequently asked questions
                        </h3>
                    </div>

                    {/* Right column with FAQ items */}
                    <div className="lg:w-2/3">
                        <div className="space-y-4">
                            {faqItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-950/[.1] dark:border-gray-50/[.1] rounded-lg overflow-hidden bg-gray-950/[.01] dark:bg-gray-50/[.10]"
                                >
                                    <button
                                        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.15] transition-colors duration-200"
                                        onClick={() => setOpenItem(openItem === index ? null : index)}
                                    >
                                        <span className="text-left font-medium text-gray-900 dark:text-gray-100">
                                            {item.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${openItem === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {openItem === index && (
                                        <div className="px-6 py-4 border-t border-gray-950/[.1] dark:border-gray-50/[.1]">
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {item.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

