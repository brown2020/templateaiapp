"use client"
import { cn } from "@/lib/utils"
import { appConfig } from "@/appConfig";

const { features } = appConfig;

export default function GrowthSection() {
    return (
        <section className="relative overflow-hidden py-12">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="relative text-center mb-12">
                    <h2 className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        GROWTH TOOLS
                        <span className="ml-2 w-12 h-px bg-blue-600 dark:bg-blue-400"></span>
                    </h2>
                    <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                        All the tools required for social media growth in one place
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.data.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={cn(
                                "rounded-2xl p-8 text-white overflow-hidden relative group transition-all duration-300",
                                index % 2 === 0 ? "bg-gradient-to-r from-[#1457db] to-[#002ea6]" :
                                    "bg-gradient-to-r from-indigo-600 to-pink-600",
                                feature.size === "lg" ? "md:col-span-2" : ""
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider bg-black/10 dark:bg-white/10 rounded-full mb-4">
                                    {feature.tag}
                                </span>

                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className={`${feature.size === "sm" ? "w-[85%]" : ""} text-white/80 mb-4`}>{feature.description}</p>

                                <div className="absolute bottom-4 right-4 opacity-10">
                                    <feature.icon size={64} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
