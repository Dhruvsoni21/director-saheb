"use client";

import { motion } from "framer-motion";


export default function HeroSection() {
    // Group 1: Left
    const leftSkills = [
        { img: "/assets/skills/pic1.png", text: "Photography" },
        { img: "/assets/skills/pic2.png", text: "Cinematography" },
    ];
    // Group 2: Center
    const centerSkills = [
        { img: "/assets/skills/pic4.png", text: "સંઘર્ષશીલ Director" },
        { img: "/assets/skills/pic4.png", text: "Creative Direction" },
    ];
    // Group 3: Right
    const rightSkills = [
        { img: "/assets/skills/pic3.png", text: "Screenplay writing" },
        { img: "/assets/skills/pic5.png", text: "Ayeditor" },
    ];

    const SkillItem = ({ img, text }: { img: string, text: string }) => (
        <div className="flex items-center gap-4 bg-neutral-900/80 p-3 pr-6 rounded-full border border-neutral-700 hover:border-neutral-500 transition-all hover:scale-105 backdrop-blur-sm">
            <img
                src={img}
                alt={text}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-neutral-600"
            />
            <span className="text-neutral-200 text-sm md:text-xl font-medium whitespace-nowrap">{text}</span>
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
                    className="text-4xl md:text-6xl lg:text-9xl font-thin tracking-[0.2em] text-[#ffbf00] uppercase text-center italic opacity-85 relative"
                    style={{
                        textShadow: '0 0 20px rgba(212, 175, 55, 0.15)',
                        WebkitTextStroke: '1px rgba(255, 191, 0, 0.3)'
                    }}
                >
                    CINEMA
                </h1>
                <p className="text-sm md:text-2xl text-[#c5a009] mt-2 font-serif tracking-widest relative">
                    KE LIYE KAI PAN KAREGA!!!
                </p>

                <div className="mt-16 w-full max-w-[90vw] lg:max-w-7xl">
                    <h2 className="text-2xl md:text-3xl text-white mb-10 underline underline-offset-8 decoration-neutral-500 font-serif">
                        આ મારી AavaDat :
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
                        <p className="text-[#f2f2ee] text-sm md:text-2xl font-light italic opacity-80">“Camera ke peeche mai kaise rahoo mai, aur camera ke aage <span className="underline">mai</span> kaise kar doon tumko <span className="text-yellow-400">highlight</span>!</p>
                        <p className="text-[#f2f2ee] text-sm md:text-2xl font-light italic opacity-80">I am trying to build ek aisi industry, jahan sunn ke stories, imagination nahi hota finite.</p>
                        <p className="text-[#f2f2ee] text-sm md:text-2xl font-light italic opacity-80">Karta shoot aur mai likhta bhi hoon. I am DA 1, who’ll put you in the limelight.</p>
                        <p className="text-[#f2f2ee] text-sm md:text-2xl font-light italic opacity-80">Mera peripheral is brighter than your ‘taunt wala side-eye’.</p>
                        <p className="text-[#f2f2ee] text-sm md:text-2xl font-light italic opacity-80">I shoot while I swim, I shoot while you climb. Shoot tab bhi karunga while you sky-dive.” </p>
                    </div>

                    <div className="w-16 md:w-24 h-[1px] bg-neutral-800 mx-auto my-8 md:my-12" />

                    <div className="text-amber-500 text-lg md:text-4xl font-serif font-medium leading-loose tracking-wide filter drop-shadow-sm">
                        <p className="mb-2">“Rock Bottom pe liya hard drop aur Khod ke gaya usse bhi Niche,</p>
                        <p><span className="underline">Way to Light</span> left itna Piche ki ab <span className="drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] text-yellow-300 font-bold">‘only way up’</span> hi mereko Khiche.”</p>
                        <p className="text-right mt-6 text-xl md:text-3xl text-[#ffbf00] font-serif italic opacity-90 mr-4 md:mr-20">~ Kshitij</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
