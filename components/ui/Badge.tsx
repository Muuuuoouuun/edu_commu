import { cn } from "@/lib/utils";

type Tone = "lamp" | "plant" | "wood" | "eraser" | "neutral";

const TONES: Record<Tone, string> = {
    lamp: "bg-lamp-wash text-lamp-ink border-lamp/30",
    plant: "bg-plant-wash text-plant border-plant/30",
    wood: "bg-paper-sunken text-wood border-wood/30",
    eraser: "bg-eraser-wash text-eraser border-eraser/30",
    neutral: "bg-paper-sunken text-graphite-soft border-rule",
};

export function Badge({
    tone = "neutral",
    hand = false,
    className,
    children,
}: {
    tone?: Tone;
    /** 손글씨 폰트로 표시할지 — 장식성 라벨에만 사용 */
    hand?: boolean;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5",
                hand
                    ? "font-[family-name:var(--font-hand)] text-sm leading-5"
                    : "text-xs font-semibold",
                TONES[tone],
                className
            )}
        >
            {children}
        </span>
    );
}
