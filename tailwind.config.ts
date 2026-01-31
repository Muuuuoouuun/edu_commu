import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#2e1065", // Deeper Purple/Indigo
                    foreground: "#ffffff",
                    soft: "#4c1d95",
                },
                accent: {
                    rose: "#fb7185", // Muted Rose
                    gold: "#fbbf24", // Warmer Gold
                    cyan: "#22d3ee", // Bright Cyan for contrast
                },
                background: "#f8fafc", // Very light cool gray
                surface: "#ffffff",
                glass: {
                    DEFAULT: "rgba(255, 255, 255, 0.7)",
                    border: "rgba(255, 255, 255, 0.5)",
                },
                text: {
                    main: "#0f172a", // Slate 900
                    muted: "#64748b", // Slate 500
                },
                border: "#e2e8f0",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                serif: ["var(--font-playfair)", "serif"], // Optional for headings if needed
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-glow": "conic-gradient(from 180deg at 50% 50%, #2e1065 0deg, #4c1d95 55deg, #fb7185 120deg, #fbbf24 160deg, transparent 360deg)",
                "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))",
            },
        },
    },
    plugins: [],
};
export default config;
