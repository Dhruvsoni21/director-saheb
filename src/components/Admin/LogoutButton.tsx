"use client";



export default function LogoutButton() {


    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (res.ok) {
                // Force a full page reload to clear any client-side state
                window.location.href = "/admin/login";
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="text-xs font-mono uppercase text-red-500 hover:text-red-400 border border-red-900/30 bg-red-950/20 px-4 py-2 transition-colors hover:border-red-800"
        >
            Disconnect
        </button>
    );
}
