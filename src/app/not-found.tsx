import Link from 'next/link';
import { Film } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white transform translate-y-12" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform -translate-y-12" />
            </div>

            <div className="text-center z-10 space-y-6">
                <div className="flex justify-center mb-8 text-neutral-600">
                    <Film size={64} strokeWidth={1} />
                </div>

                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-800">
                    404
                </h1>

                <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl uppercase tracking-widest font-light text-neutral-400">
                        Scene Not Found
                    </h2>
                    <p className="text-neutral-500 max-w-md mx-auto">
                        The shot you are looking for has been cut from the final edit or never existed.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-block border border-neutral-700 hover:bg-white hover:text-black px-8 py-3 uppercase tracking-[0.2em] text-xs transition-all duration-300"
                    >
                        Back to Set
                    </Link>
                </div>
            </div>
        </div>
    );
}
