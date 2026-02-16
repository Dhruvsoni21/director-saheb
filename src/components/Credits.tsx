
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

export default function Credits() {
    const credits = [
        {
            role: "Lead Developer",
            name: "Dhruv Soni",
            image: "/assets/credits/dhruv.jpeg", // Placeholder
            description: "Full Stack Architecture & Design",
            links: [
                { icon: <Mail size={18} />, href: "mailto:dhruvsonip21@gmail.com", label: "Email" },
                { icon: <Phone size={18} />, href: "tel:+919106411833", label: "Phone" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/dhruv-soni-6a7a55276", label: "LinkedIn" },
                { icon: <Instagram size={18} />, href: "https://www.instagram.com/dhruvvvv.soni/", label: "Instagram" },
            ]
        },
        {
            role: "Tech Assist",
            name: "Yatharth Zinzuwadia",
            image: "/assets/credits/yoki.jpeg", // Placeholder
            description: "Development Support & Review",
            links: [
                { icon: <Mail size={18} />, href: "mailto:yatharthzinzuwadia@gmail.com", label: "Email" },
                { icon: <Phone size={18} />, href: "tel:+919173325960", label: "Phone" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/yatharth-zinzuwadia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
                { icon: <Instagram size={18} />, href: "https://www.instagram.com/_yoki_x/", label: "Instagram" },
            ]
        },
        {
            role: "Content Provider",
            name: "Parijat Lamba",
            image: "/assets/credits/pari.jpeg", // Placeholder
            description: "Content Writer & Manager",
            links: [
                { icon: <Mail size={18} />, href: "mailto:Parijatlamba@outlook.com", label: "Email" },
                { icon: <Phone size={18} />, href: "tel:+918866111473", label: "Phone" },
                { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/parijatlamba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
                { icon: <Instagram size={18} />, href: "https://www.instagram.com/watashiwa.parijatto/", label: "Instagram" },
            ]
        }
    ];

    return (
        <section id="credits" className="py-20 bg-black border-t border-neutral-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-2xl uppercase tracking-[0.3em] text-neutral-500 mb-4">Shout out to Kshitij</h2>
                    <p className="text-2xl font-primary text-white/90 italic">Tumhari is website ko Yogdan</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {credits.map((person, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 hover:border-white/30 transition-all hover:bg-neutral-900/50"
                        >
                            <div className="flex flex-col items-center text-center h-full">
                                {person.image && (
                                    <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-neutral-700 group-hover:border-white transition-colors shadow-lg">
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="mb-3">
                                    <h3 className="text-xl text-white font-medium mb-1">{person.name}</h3>
                                    <span className="text-xs font-medium tracking-widest text-white uppercase block">{person.role}</span>
                                </div>

                                <p className="text-neutral-400 text-sm mb-6 font-light leading-relaxed max-w-[80%] mx-auto">{person.description}</p>

                                <div className="mt-auto flex items-center gap-4">
                                    {person.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.href}
                                            {...(link.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                            className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                            title={link.label}
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
