export default function GridBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <pattern id="diagonal-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                        <g filter="url(#glow)">
                            <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1" />
                            <line x1="0" y1="20" x2="100%" y2="20" stroke="white" strokeWidth="1" strokeDasharray="15,15" />
                        </g>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
            </svg>
        </div>
    );
}
