"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutMe() {
    const [clickCount, setClickCount] = useState(0);
    const router = useRouter();

    // Timer reset effect only
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (clickCount > 0) {
            timer = setTimeout(() => setClickCount(0), 2000);
        }
        return () => clearTimeout(timer);
    }, [clickCount]);

    const handleImageClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 5) {
            router.push('/admin');
            setClickCount(0);
        }
    };

    return (
        <section className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-16 ml-2 relative z-10">There</h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

                    {/* Main Card */}
                    <div className="relative bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] py-12 px-6 md:py-32 md:px-16 overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center">

                            {/* Image Section - 35% */}
                            <div className="w-full md:w-[35%] max-w-sm mx-auto md:mx-0 relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                                    onClick={handleImageClick}
                                >
                                    {/* Double border effect */}
                                    <div className="absolute inset-0 border-[1px] border-white/20 z-10 rounded-2xl" />
                                    <div className="absolute inset-2 border-[1px] border-white/10 z-10 rounded-xl" />

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/assets/about/aboutpic.jpg"
                                        alt="Portrait"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                    {/* Visual feedback for secret clicks */}
                                    <div className={`absolute inset-0 bg-white/10 pointer-events-none transition-opacity duration-100 ${clickCount > 0 ? 'opacity-100' : 'opacity-0'}`} />
                                </motion.div>

                                {/* Decorative elements backing the image */}
                                <div className="absolute -inset-4 border border-white/5 rounded-3xl -z-10" />
                            </div>

                            {/* Text Section - 65% */}
                            <div className="w-full md:w-[65%]">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="text-center md:text-left relative"
                                >
                                    <div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/10 text-white text-[10px] tracking-widest">
                                        di·rec·tor
                                    </div>

                                    <div className="space-y-6 text-white/80 leading-relaxed font-light">
                                        <p className="text-xl md:text-2xl text-white font-medium italic">
                                            "Cinema didn’t inspire me, it consumed me."
                                        </p>

                                        <p>
                                            I’ve watched, listened, and lived with stories long enough for them to stop being optional. Music keeps my pulse alive; cinema gives it purpose. This was never a career plan. It was always instinct.
                                        </p>

                                        <p>
                                            Not in the game for love, I just got love for the game, <span className="italic text-white">kripiya dhyan rakhein.</span> - Dhanji. Not here to replace one system with another or play power games dressed up as progress. My idea of change is creating space, enough space for people to breathe, think, and make without asking permission. I don’t call myself a visionary, but I do look past the obvious. What you see is only the surface.
                                        </p>

                                        <div className="pt-4 border-t border-white/10 mt-6">
                                            <p className="text-lg md:text-xl text-white font-primary italic">
                                                I work at the horizon, where stories stretch beyond frames, where comfort ends, and honesty begins.
                                            </p>
                                        </div>
                                    </div>



                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
