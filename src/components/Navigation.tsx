"use client";

import { motion } from "framer-motion";

export default function Navigation() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (

        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed top-4 left-0 right-0 md:left-auto md:top-8 md:right-8 z-[100] flex flex-row justify-center md:justify-end gap-1.5 md:gap-8 text-center md:text-right mix-blend-difference flex-nowrap px-1 md:px-0 w-full md:w-auto overflow-x-auto no-scrollbar"
        >
            <button
                onClick={() => scrollToSection('home')}
                className="text-white text-[9px] md:text-xs uppercase tracking-tight md:tracking-[0.2em] hover:text-neutral-400 transition-colors whitespace-nowrap"
            >
                Home
            </button>
            <button
                onClick={() => scrollToSection('archive')}
                className="text-white text-[9px] md:text-xs uppercase tracking-tight md:tracking-[0.2em] hover:text-neutral-400 transition-colors whitespace-nowrap"
            >
                Archive
            </button>
            <button
                onClick={() => scrollToSection('specials')}
                className="text-white text-[9px] md:text-xs uppercase tracking-tight md:tracking-[0.2em] hover:text-neutral-400 transition-colors whitespace-nowrap"
            >
                Specials
            </button>
            <button
                onClick={() => scrollToSection('upcoming')}
                className="text-white text-[9px] md:text-xs uppercase tracking-tight md:tracking-[0.2em] hover:text-neutral-400 transition-colors whitespace-nowrap"
            >
                Upcoming
            </button>
            <button
                onClick={() => scrollToSection('about')}
                className="text-white text-[9px] md:text-xs uppercase tracking-tight md:tracking-[0.2em] hover:text-neutral-400 transition-colors whitespace-nowrap"
            >
                About
            </button>
            <button
                onClick={() => scrollToSection('contact')}
                className="text-white text-[9px] md:text-xs uppercase tracking-tight md:tracking-[0.2em] hover:text-neutral-400 transition-colors whitespace-nowrap"
            >
                Contact
            </button>
            <button
                onClick={() => scrollToSection('credits')}
                className="text-white text-[9px] md:text-xs uppercase tracking-tight md:tracking-[0.2em] hover:text-neutral-400 transition-colors whitespace-nowrap"
            >
                Credits
            </button>
        </motion.nav>
    );
}
