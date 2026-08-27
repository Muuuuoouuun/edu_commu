import { cn } from "@/lib/utils";

/**
 * 색으로 구분하지 않는다.
 * 질문/후기 같은 분류는 잉크 한 색과 1px 테두리, 또는 회색 텍스트로만 나타낸다.
 */
type Tone = "accent" | "neutral";

const TONES: Record<Tone, string> = {
    accent: "border-graphite text-graphite",
    neutral: "border-rule text-graphite-faint",
};

export function Badge({
    tone = "neutral",
    hand = false,
    className,
    children,
}: {
    tone?: Tone;
    /** 손글씨 폰트로 표시할지 — 매거진 영역의 장식 라벨에만 쓴다 */
    hand?: boolean;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 border px-2 py-0.5",
                hand
                    ? "font-[family-name:var(--font-hand)] text-sm leading-5"
                    : "text-[11px] font-medium tracking-wide",
                TONES[tone],
                className
            )}
        >
            {children}
        </span>
    );
}

/** 테두리 없이 분류만 알리는 라벨 — 목록 행의 왼쪽 칸에 쓴다 */
export function RowLabel({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <span className={cn("text-[13px] text-graphite-faint", className)}>
            {children}
        </span>
    );
}
