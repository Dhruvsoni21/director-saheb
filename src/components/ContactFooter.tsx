"use client";

import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";


export default function ContactFooter() {
    return (
        <footer className="bg-black/90 text-white pt-32 pb-16 px-6 border-t border-white/10 relative overflow-hidden">
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
                        Hire Us Before We Get <span className="text-white/60">Expensive!</span>
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl font-light">
                        A small team, sharp instincts, and cinema-first thinking.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
                    {/* Email Card */}
                    <a href="mailto:kshitij354421@gmail.com" className="flex flex-col p-6 md:p-8 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm hover:border-white/40 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-12 group-hover:bg-white/20 transition-colors">
                            <Mail className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg md:text-l font-medium mb-2 break-words">Your story deserves better than “good enough”.</h3>

                        <span className="text-white/80 font-medium mt-auto group-hover:text-white transition-colors">kshitij354421@gmail.com</span>
                    </a>

                    {/* WhatsApp Card */}
                    <a href="https://wa.me/918866111473" target="_blank" rel="noopener noreferrer" className="flex flex-col p-8 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm hover:border-white/40 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-12 group-hover:bg-white/20 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-white"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.232-.298.347-.497.115-.198.058-.372-.029-.545-.087-.174-.787-1.933-1.078-2.61-.282-.648-.567-.561-.78-.57-.205-.009-.441-.011-.676-.011-.236 0-.618.088-.941.442-.324.353-1.24 1.213-1.24 2.959 0 1.747 1.272 3.435 1.448 3.683.176.249 2.504 3.824 6.066 5.362 2.127.918 2.56.735 3.018.689.458-.046 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium mb-2">Voice note chalega. Vision clear hona chahiye.</h3>

                        <span className="text-white/80 font-medium mt-auto group-hover:text-white transition-colors">+91 88661 11473</span>
                    </a>

                    {/* Instagram Card */}
                    <a href="https://www.instagram.com/shrota.kshitij_?igsh=aTR5bGhsY2RnbGJl" target="_blank" rel="noopener noreferrer" className="flex flex-col p-8 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm hover:border-white/40 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-12 group-hover:bg-white/20 transition-colors">
                            <Instagram className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Slide into the DMs. We’ll handle the visuals.</h3>

                        <span className="text-white/80 font-medium mt-auto group-hover:text-white transition-colors">@shrota.kshitij_</span>
                    </a>

                    {/* LinkedIn Card */}
                    <a href="https://www.linkedin.com/in/kshitij-aghara-25339a202" target="_blank" rel="noopener noreferrer" className="flex flex-col p-8 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm hover:border-white/40 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-12 group-hover:bg-white/20 transition-colors">
                            <Linkedin className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Looking for a creative partner, not just a vendor?</h3>

                        <span className="text-white/80 font-medium mt-auto group-hover:text-white transition-colors">Kshitij (Krishna) Aghara</span>
                    </a>

                    {/* Twitter Card */}
                    <a href="https://x.com/NarK28212295" target="_blank" rel="noopener noreferrer" className="flex flex-col p-8 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm hover:border-white/40 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-12 group-hover:bg-white/20 transition-colors">
                            <Twitter className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Cinema-first. Clout later. We’ve got the lens.</h3>

                        <span className="text-white/80 font-medium mt-auto group-hover:text-white transition-colors">@NarK</span>
                    </a>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 uppercase tracking-wider gap-4">
                    <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Kshitij Aghara. All rights reserved.</p>
                    <p>No Turning Back</p>
                </div>
            </div>
        </footer>
    );
}
