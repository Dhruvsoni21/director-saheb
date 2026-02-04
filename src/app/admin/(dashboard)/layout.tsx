import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import LogoutButton from '@/components/Admin/LogoutButton';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const authed = await isAuthenticated();

    if (!authed) {
        redirect('/admin/login');
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="/assets/admin/adminbg.jpeg"
                    alt="Admin Background"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>

            {/* Content wrapper */}
            <div className="relative z-10">
                <nav className="border-b border-neutral-900 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <span className="font-bold tracking-widest text-neutral-400">ADMIN PANEL</span>
                            <Link href="/" className="text-xs text-neutral-600 hover:text-white transition-colors uppercase tracking-widest">
                                Live Site
                            </Link>
                        </div>
                        <LogoutButton />
                    </div>
                </nav>
                <main className="container mx-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
