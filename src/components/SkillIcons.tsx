import React from 'react';

// Common props for all icons
interface IconProps {
    className?: string;
}

// 35mm Film Strip - Represents "Frames"
export const FramesIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth="1.5" />
        <path d="M4 8l16 0" />
        <path d="M4 16l16 0" />
        <path d="M4 2c0 0 2 0 2 2s-2 2-2 2" /> {/* Left Sprocket 1 */}
        <path d="M4 8c0 0 2 0 2 2s-2 2-2 2" /> {/* Left Sprocket 2 */}
        <path d="M4 16c0 0 2 0 2 2s-2 2-2 2" /> {/* Left Sprocket 3 */}
        <path d="M20 2c0 0-2 0-2 2s2 2 2 2" /> {/* Right Sprocket 1 */}
        <path d="M20 8c0 0-2 0-2 2s2 2 2 2" /> {/* Right Sprocket 2 */}
        <path d="M20 16c0 0-2 0-2 2s2 2 2 2" /> {/* Right Sprocket 3 */}
    </svg>
);

// Camera Plot/Blocking - Represents "Blueprint"
export const BlueprintIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Top down camera view */}
        <path d="M14 19l-3-3" />
        <path d="M18 19l-7-7" />
        <path d="M4 5h16" strokeDasharray="2 2" />
        <path d="M4 5l8 10l8-10" strokeOpacity="0.5" />
        <circle cx="12" cy="15" r="2" /> {/* Camera Body */}
        <path d="M10 17l-3 4" /> {/* Tripod Leg 1 */}
        <path d="M14 17l3 4" /> {/* Tripod Leg 2 */}

        {/* Subject/Light */}
        <circle cx="12" cy="5" r="3" strokeDasharray="4 2" />
        <path d="M12 2v1" />
        <path d="M12 7v1" />
        <path d="M9 5h1" />
        <path d="M14 5h1" />
    </svg>
);

// Director's Chair - Represents "Direction"
export const DirectionIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 21L9 12" /> {/* Front Leg Left */}
        <path d="M19 21L15 12" /> {/* Front Leg Right */}
        <path d="M15 12h-6" /> {/* Seat */}
        <path d="M5 5h14" /> {/* Backrest Top */}
        <path d="M5 9h14" /> {/* Backrest Bottom */}
        <path d="M5 5v16" /> {/* Back Leg Left */}
        <path d="M19 5v16" /> {/* Back Leg Right */}
        <path d="M6 16l12 0" strokeOpacity="0.5" /> {/* Cross brace */}
    </svg>
);

// Aperture/Iris - Represents "Intent" (Focus)
export const IntentIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> {/* Center hole */}
        <path d="M12 2l2 8" />
        <path d="M12 22l-2 -8" />
        <path d="M22 12l-8 -2" />
        <path d="M2 12l8 2" />
        <path d="M4.93 4.93l6.07 4.07" />
        <path d="M19.07 19.07l-6.07 -4.07" />
        <path d="M19.07 4.93l-4.07 6.07" />
        <path d="M4.93 19.07l4.07 -6.07" />
    </svg>
);

// Dolly Track / Camera Movement - Represents "Motion"
export const MotionIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Track */}
        <path d="M2 20h20" />
        <path d="M4 20v-2" />
        <path d="M8 20v-2" />
        <path d="M12 20v-2" />
        <path d="M16 20v-2" />
        <path d="M20 20v-2" />

        {/* Wheels */}
        <circle cx="7" cy="16" r="2" />
        <circle cx="17" cy="16" r="2" />
        <path d="M7 16h10" /> {/* Base */}

        {/* Camera on Tripod on Dolly */}
        <path d="M12 16v-6" />
        <path d="M8 9h8l-1 5H9l-1-5z" /> {/* Camera Body */}
        <path d="M16 10l3 2l-1 2l-2-1" /> {/* Lens */}
        <path d="M9 9l-2-2" /> {/* Viewfinder */}
        <path d="M10 6l2-2l2 2" strokeDasharray="2 1" /> {/* Motion lines */}
    </svg>
);

// Film Editing/Splicing - Represents "Cut"
export const CutIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Razor Blade / Cut line */}
        <path d="M4 12h16" strokeDasharray="4 2" />
        <path d="M12 4v16" strokeWidth="2" />

        {/* Film Strip Pieces */}
        <rect x="3" y="6" width="18" height="12" rx="2" strokeOpacity="0.5" />
        <path d="M7 6v12" />
        <path d="M17 6v12" />

        {/* Scissors overlay feeling */}
        <path d="M6 18l12-12" strokeWidth="0.5" strokeOpacity="0.3" />
        <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.2" />
    </svg>
);
