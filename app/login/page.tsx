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

        // Use NextAuth signIn
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            alert("Invalid credentials. Try test@example.com / password123");
            setIsLoading(false);
        } else {
            router.push("/");
            router.refresh();
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-50">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary-DEFAULT mb-2">Welcome Back</h1>
                    <p className="text-text-muted">Sign in to access premium content</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue="test@example.com"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary-DEFAULT focus:ring-1 focus:ring-primary-DEFAULT outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            defaultValue="password123"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary-DEFAULT focus:ring-1 focus:ring-primary-DEFAULT outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary-DEFAULT text-white py-3.5 rounded-xl font-bold hover:bg-primary-soft transition-all disabled:opacity-70 flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account? <span className="text-accent-rose font-medium cursor-pointer">Sign up</span> (Demo)
                </div>
            </div>
        </div>
    );
}
