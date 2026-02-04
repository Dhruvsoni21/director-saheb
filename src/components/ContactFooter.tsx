"use client";

import { Mail, Instagram, Phone, Linkedin, Twitter } from "lucide-react";


export default function ContactFooter() {
    return (
        <footer className="bg-black/80 text-white pt-32 pb-16 px-6 border-t border-neutral-900 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero/bg.jpeg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                        Mere Cinema Building ke <span className="text-neutral-500">Sapne.</span>
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl font-light">
                        Aapke cinema building me earthquake
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
                    {/* Email Card */}
                    <a href="mailto:kshitij354421@gmail.com" className="flex flex-col p-6 md:p-8 rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-neutral-600 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-12 group-hover:bg-neutral-800 transition-colors">
                            <Mail className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg md:text-l font-medium mb-2 break-words">PROFESSIONALLY IDHAR!!!!</h3>

                        <span className="text-neutral-300 font-medium mt-auto group-hover:text-white transition-colors">kshitij354421@gmail.com</span>
                    </a>

                    {/* Phone Card */}
                    <a href="tel:+918866111473" className="flex flex-col p-8 rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-neutral-600 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-12 group-hover:bg-neutral-800 transition-colors">
                            <Phone className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-2">PHONE KAR DENA!</h3>

                        <span className="text-neutral-300 font-medium mt-auto group-hover:text-white transition-colors">+91 88661 11473</span>
                    </a>

                    {/* Instagram Card */}
                    <a href="https://www.instagram.com/shrota.kshitij_?igsh=aTR5bGhsY2RnbGJl" target="_blank" rel="noopener noreferrer" className="flex flex-col p-8 rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-neutral-600 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-12 group-hover:bg-neutral-800 transition-colors">
                            <Instagram className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-2">MAINLY IDHAR.</h3>

                        <span className="text-neutral-300 font-medium mt-auto group-hover:text-white transition-colors">@shrota.kshitij_</span>
                    </a>

                    {/* LinkedIn Card */}
                    <a href="https://www.linkedin.com/in/kshitij-aghara-25339a202" target="_blank" rel="noopener noreferrer" className="flex flex-col p-8 rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-neutral-600 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-12 group-hover:bg-neutral-800 transition-colors">
                            <Linkedin className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-2">PARCHURAN</h3>

                        <span className="text-neutral-300 font-medium mt-auto group-hover:text-white transition-colors">Kshitij (Krishna) Aghara</span>
                    </a>

                    {/* Twitter Card */}
                    <a href="https://x.com/NarK28212295" target="_blank" rel="noopener noreferrer" className="flex flex-col p-8 rounded-2xl border border-neutral-800 bg-black/40 backdrop-blur-sm hover:border-neutral-600 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-12 group-hover:bg-neutral-800 transition-colors">
                            <Twitter className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-2">PARCHURAN</h3>

                        <span className="text-neutral-300 font-medium mt-auto group-hover:text-white transition-colors">@NarK</span>
                    </a>
                </div>

                <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 uppercase tracking-wider gap-4">
                    <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Kshitij Aghara. All rights reserved.</p>
                    <p>Director of Photography</p>
                </div>
            </div>
        </footer>
    );
}
