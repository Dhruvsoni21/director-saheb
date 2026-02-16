"use client";

import { motion } from "framer-motion";
import { FramesIcon, BlueprintIcon, DirectionIcon, IntentIcon, MotionIcon, CutIcon } from "./SkillIcons";


export default function HeroSection() {
    // Group 1: Left
    const leftSkills = [
        { Icon: FramesIcon, text: "Frames" },
        { Icon: BlueprintIcon, text: "Blueprint" },
    ];
    // Group 2: Center
    const centerSkills = [
        { Icon: DirectionIcon, text: "Direction" },
        { Icon: IntentIcon, text: "Intent" },
    ];
    // Group 3: Right
    const rightSkills = [
        { Icon: MotionIcon, text: "Motion " },
        { Icon: CutIcon, text: "Cut" },
    ];

    const SkillItem = ({ Icon, text }: { Icon: React.FC<{ className?: string }>, text: string }) => (
        <div className="flex items-center gap-4 bg-neutral-900/80 p-3 pr-6 rounded-full border border-neutral-700 hover:border-neutral-500 transition-all hover:scale-105 backdrop-blur-sm group w-64 md:w-80">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-neutral-600 flex items-center justify-center bg-black/50 group-hover:border-neutral-400 transition-colors shrink-0">
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-neutral-300 group-hover:text-white transition-colors" />
            </div>
            <span className="text-white/80 text-sm md:text-xl font-medium whitespace-normal md:whitespace-nowrap text-left">{text}</span>
        </div>
    );

    return (
        <section className="min-h-[70vh] bg-black/80 flex flex-col items-center justify-center border-t border-neutral-900 py-20 gap-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero/bg.jpeg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center flex flex-col items-center w-full relative z-10"
            >
                {/* Vignette for readability */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/60 via-black/20 to-transparent blur-3xl -z-10 pointer-events-none transform scale-150" />

                <h1
                    className="text-4xl md:text-6xl lg:text-9xl font-thin tracking-[0.2em] text-white uppercase text-center italic opacity-85 relative"
                    style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.15)',
                        WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                    }}
                >
                    MADE FOR CINEMA
                </h1>
                <p className="text-sm md:text-2xl text-white/80 mt-2 font-primary tracking-widest relative">
                    Before money, before praise, before certainty. There’s the camera and the story that needs to be told.
                </p>

                <div className="mt-16 w-full max-w-[90vw] lg:max-w-7xl">
                    <h2 className="text-2xl md:text-3xl text-white mb-10 underline underline-offset-8 decoration-white/50 font-primary">
                        I’ll bleed for the frame :
                    </h2>

                    {/* Centered layout container */}
                    <div className="flex flex-col xl:flex-row items-center justify-center gap-10 w-full px-4">

                        {/* Left Group - Vertical Column */}
                        <div className="flex flex-col gap-6 md:gap-8 xl:items-end flex-1 w-full xl:w-auto items-center">
                            {leftSkills.map((skill, index) => (
                                <SkillItem key={index} {...skill} />
                            ))}
                        </div>

                        {/* Center Group */}
                        <div className="flex flex-col gap-6 md:gap-8 justify-center items-center flex-shrink-0 order-first xl:order-none mb-6 xl:mb-0">
                            {centerSkills.map((skill, index) => (
                                <SkillItem key={index} {...skill} />
                            ))}
                        </div>

                        {/* Right Group - Vertical Column */}
                        <div className="flex flex-col gap-6 md:gap-8 xl:items-start flex-1 w-full xl:w-auto items-center">
                            {rightSkills.map((skill, index) => (
                                <SkillItem key={index} {...skill} />
                            ))}
                        </div>

                    </div>
                </div>

                <div className="mt-10 md:mt-20 text-center px-4">
                    <div className="space-y-3">
                        <p className="text-white text-lg md:text-3xl font-medium italic opacity-80">"I believe cinema works best when it’s honest. Raw ideas, clear intent, and no shortcuts.</p>
                        <p className="text-white text-lg md:text-3xl font-medium italic opacity-80">I come from a place where stories are felt before they’re framed.</p>
                        <p className="text-white text-lg md:text-3xl font-medium italic opacity-80">The work I create is shaped by instinct, experience, and the need to say something real."</p>
                    </div>

                    <div className="w-16 md:w-24 h-[1px] bg-neutral-800 mx-auto my-8 md:my-12" />

                    <div className="text-white text-lg md:text-4xl font-primary font-medium leading-loose tracking-wide filter drop-shadow-sm">
                        <p className="mb-2">“Ye portfolio nahi, process hai.</p>
                        <p>Har shot ke peeche intention hai aur har story ke peeche bhook.”</p>
                        <p className="text-right mt-6 text-xl md:text-3xl text-white font-primary italic opacity-90 mr-4 md:mr-20">~ Kshitij</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
