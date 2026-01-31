"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Loader2 } from "lucide-react";
import Image from "next/image";

export function UserButton() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loader2 className="w-5 h-5 animate-spin text-slate-400" />;
    }

    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                        <Image
                            src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`}
                            alt="User"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium text-text-main hidden md:block">
                        {session.user.name}
                    </span>
                </div>
                <button
                    onClick={() => signOut()}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors text-text-muted hover:text-accent-rose"
                    title="Sign Out"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <Link
            href="/login"
            className="p-2 hover:bg-black/5 rounded-full transition-colors hidden md:block text-text-muted hover:text-primary-DEFAULT"
        >
            <User className="w-5 h-5" />
        </Link>
    );
}
