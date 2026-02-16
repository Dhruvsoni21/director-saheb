"use client";

import { useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import HighlightedWork from "@/components/HighlightedWork";
import ProjectGrid from "@/components/ProjectGrid";
import VideoModal from "@/components/VideoModal";
import ContactFooter from "@/components/ContactFooter";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Project } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

import UpcomingProjects from "@/components/UpcomingProjects";
import AboutMe from "@/components/AboutMe";
import Credits from "@/components/Credits";

export default function ClientHome({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <main>
            <Navigation />
            <IntroSequence />

            <div id="home">
                <HeroSection />
                <div id="archive">
                    <ProjectGrid
                        projects={projects.filter(p => !p.isUpcoming)}
                        onOpenProject={setSelectedProject}
                    />
                </div>
            </div>

            <div id="specials">
                <HighlightedWork
                    projects={projects.filter(p => p.featured && !p.isUpcoming)}
                    onOpenProject={setSelectedProject}
                />
            </div>

            <div id="upcoming">
                <UpcomingProjects projects={projects.filter(p => p.isUpcoming)} />
            </div>

            <div id="about">
                <AboutMe />
            </div>

            <div id="contact">
                <ContactFooter />
            </div>

            {/* <Credits /> */}

            <AnimatePresence>
                {selectedProject && (
                    <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </main>
    );
}
