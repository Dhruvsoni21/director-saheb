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
                <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-16 ml-2 relative z-10">About Me</h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                                    <div className="inline-block px-3 py-1 mb-6 border border-amber-500/30 rounded-full bg-amber-500/10 text-amber-500 text-[10px] tracking-widest uppercase">
                                        Director
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-3xl md:text-5xl font-light text-white leading-tight">
                                            Kon Kshitij Kon Kshitij Kon Kshitij
                                        </h3>
                                        <p className="text-xl md:text-2xl text-amber-500/80 font-serif italic mt-2">
                                            Cinema Elia to Jaun Kshitij.....
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <blockquote className="border-l-2 border-amber-500/50 pl-6 py-2 italic text-lg md:text-xl text-neutral-300 font-light flex flex-col gap-2">
                                            <span>&ldquo;I want to change the whole fuckin&rsquo; Idea of this Industry aur Mainstream&hellip; I&rsquo;m Building a sensible environment around me, where I, mere homies log, and everyone who is connected or concerned in any way with art, bas grow karein.&rdquo;
                                            </span>
                                            <span className="text-right text-[#ffbf00] font-serif pr-4">~ Kshitij</span>
                                        </blockquote>


                                        <div className="text-neutral-400 leading-relaxed text-base space-y-6 font-light">
                                            <p>
                                                If you think that I am creating a whole new chain, <span className="text-neutral-300 italic">ek alag nazariye ke sath</span>, of nepotism, then I don’t need to shut you up or push you down. I’ll not be someone or something I hate while working in this ecosystem. Mai apne aap ko ek visionary nahi bolta. <span className="text-white">But kya mai hoon?</span>
                                            </p>

                                            <p className="text-neutral-200">
                                                Look down at me, <span className="font-bold">&ldquo;haan mai hoon&rdquo;</span>, or look up to me <span className="font-bold">&ldquo;haan mai hoon&rdquo;</span>.
                                            </p>

                                            <p>
                                                My idea of bringing revolution is not to empower the weak, My idea is to just bring enough power to let everyone breathe.
                                            </p>

                                            <p>
                                                I consumed so much cinema that it made me want to become a filmmaker… <span className="italic font-bold">aisa bachpan se.</span> Music, as an umbrella, is what keeps me alive. Cinema, music, art, yeh sab bohot badi badi baatein hain; jidhar tak dikhta hai, woh story, <span className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] font-medium">usse aage jo hai, woh main</span>.
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-white/5">
                                            <p className="text-lg md:text-xl text-amber-500/90 font-serif italic text-center md:text-left">
                                                Horizon is a place where earth and sky meet;<br />
                                                <span className="text-red-500">to aage se mere naam ka matlab mat poochna!</span>
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
