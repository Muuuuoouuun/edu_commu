"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            alert("Invalid credentials. Try test@example.com / password123");
            setIsLoading(false);
        } else {
            router.push("/community"); // Redirect to community after login
            router.refresh();
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-background">
            <div className="w-full max-w-sm p-8 bg-background border border-border shadow-sm">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif font-medium text-foreground mb-3">Sign in to LUMIERE</h1>
                    <p className="text-muted text-sm">Access the community and premium insights</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue="test@example.com"
                            required
                            className="w-full bg-transparent px-4 py-3 border border-border focus:border-foreground outline-none transition-colors text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            defaultValue="password123"
                            required
                            className="w-full bg-transparent px-4 py-3 border border-border focus:border-foreground outline-none transition-colors text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-foreground text-background py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted">
                    Test Account: <span className="text-foreground">test@example.com</span> / <span className="text-foreground">password123</span>
                </div>
            </div>
        </div>
    );
}
