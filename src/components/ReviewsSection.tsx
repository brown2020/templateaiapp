"use client"

import { Marquee } from "@/components/ui/marquee";
import { appConfig } from "@/appConfig";

const { reviews } = appConfig;
const firstRow = reviews.data.slice(0, reviews.data.length / 2);
const secondRow = reviews.data.slice(reviews.data.length / 2);

export default function ReviewsSection() {
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
                        Trusted by users worldwide
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        See what our customers have to say about their experience with {appConfig.title}
                    </p>
                </div>

                {/* Reviews Marquee */}
                <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:30s]">
                        {firstRow.map((review, index) => (
                            <ReviewCard key={index} index={index} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:30s] mt-8">
                        {secondRow.map((review, index) => (
                            <ReviewCard key={index} index={index} {...review} />
                        ))}
                    </Marquee>

                    {/* Gradient Overlays */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-50 dark:from-slate-950"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-slate-50 dark:from-slate-950"></div>
                </div>
            </div>
        </section>
    );
}

const ReviewCard = ({
    index,
    img,
    name,
    username,
    body,
}: {
    index: number;
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={`relative w-64 cursor-pointer overflow-hidden rounded-xl p-4 bg-gradient-to-r transition-all duration-300 ${index % 2 === 0
                    ? 'from-[#1457db] to-[#002ea6]'
                    : 'from-indigo-600 to-pink-600'
                }`}>
            <div className="flex flex-row items-center gap-2">
                <img
                    className="rounded-full border-2 border-white/20"
                    width="40"
                    height="40"
                    alt=""
                    src={img}
                />
                <div className="flex flex-col">
                    <figcaption className="text-md font-medium text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-white">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm text-white">
                {body}
            </blockquote>
        </figure >
    );
};