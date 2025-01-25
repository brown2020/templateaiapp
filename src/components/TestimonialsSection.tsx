"use client"

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { appConfig } from "@/appConfig";
import Image from "next/image";

// Split testimonials into three equal groups
const { testimonials } = appConfig;
const chunkSize = Math.ceil(testimonials.data.length / 3);
const firstRow = testimonials.data.slice(0, chunkSize);
const secondRow = testimonials.data.slice(chunkSize, chunkSize * 2);
const thirdRow = testimonials.data.slice(chunkSize * 2);

export default function TestimonialsSection() {
    return (
        <section className="relative overflow-hidden py-12">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="relative text-center mb-5">
                    <h2 className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        CUSTOMER TESTIMONIALS
                        <span className="ml-2 w-12 h-px bg-blue-600 dark:bg-blue-400"></span>
                    </h2>
                    <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                        Trusted by customers worldwide
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        See what our customers have to say about their experience with {appConfig.title}
                    </p>
                </div>

                {/* Reviews Marquee */}
                <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-2 h-[600px] w-full overflow-hidden">
                    <Marquee pauseOnHover vertical className="[--duration:20s] max-sm:p-0">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.name} {...review} className="w-full" />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover vertical className="[--duration:20s] max-sm:p-0">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.name} {...review} className="w-full" />
                        ))}
                    </Marquee>
                    <Marquee pauseOnHover vertical className="[--duration:20s] max-sm:hidden">
                        {thirdRow.map((review) => (
                            <ReviewCard key={review.name} {...review} className="w-full" />
                        ))}
                    </Marquee>

                    {/* Gradient Overlays */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-slate-50 dark:from-slate-950"></div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-50 dark:from-slate-950"></div>
                </div>
            </div>
        </section>
    );
}

const ReviewCard = ({
    img,
    name,
    body,
    className,
}: {
    img: string;
    name: string;
    body: string;
    className: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                className
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};