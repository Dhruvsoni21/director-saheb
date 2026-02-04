'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { RefreshCcw, AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg max-w-md w-full text-center space-y-6">
                <div className="flex justify-center text-red-500">
                    <AlertCircle size={48} />
                </div>

                <h2 className="text-2xl font-light tracking-wide">Technical Difficulties</h2>

                <p className="text-neutral-400 text-sm">
                    Something went wrong while rendering this scene.
                    <br />
                    <span className="text-neutral-600 text-xs mt-2 block font-mono">
                        Error: {error.message || 'Unknown Error'}
                    </span>
                </p>

                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="w-full bg-white text-black py-3 uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                    <RefreshCcw size={14} />
                    Try Again
                </button>
            </div>
        </div>
    );
}
