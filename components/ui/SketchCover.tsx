import { cn } from "@/lib/utils";
import { Doodle, type DoodleName } from "./Sketch";

/**
 * 기사/카드 커버를 연필 스케치로 그린다.
 * 외부 이미지에 의존하지 않아 다크모드에서도 톤이 유지되고, 네트워크 요청이 없다.
 * `seed`로 무늬가 결정되므로 같은 글은 항상 같은 커버를 갖는다.
 */

const TINTS = [
    "bg-lamp-wash text-lamp",
    "bg-plant-wash text-plant",
    "bg-paper-sunken text-wood",
    "bg-eraser-wash text-eraser",
] as const;

const PATTERNS = ["grid-paper", "ruled-lines", "grid-paper", "ruled-lines"] as const;

function hash(seed: string) {
    let value = 0;
    for (let i = 0; i < seed.length; i += 1) {
        value = (value * 31 + seed.charCodeAt(i)) % 100000;
    }
    return value;
}

export function SketchCover({
    seed,
    doodle = "book",
    label,
    className,
}: {
    seed: string;
    doodle?: DoodleName;
    /** 커버 위에 손글씨로 얹는 짧은 라벨 */
    label?: string;
    className?: string;
}) {
    const index = hash(seed);
    const tint = TINTS[index % TINTS.length];
    const pattern = PATTERNS[index % PATTERNS.length];
    const tilt = (index % 5) - 2; // -2deg ~ 2deg

    return (
        <div
            aria-hidden="true"
            className={cn(
                "relative isolate flex items-center justify-center overflow-hidden",
                tint,
                className
            )}
        >
            <div className={cn("absolute inset-0 opacity-40", pattern)} />
            <div
                className="relative flex flex-col items-center gap-2"
                style={{ rotate: `${tilt}deg` }}
            >
                <Doodle name={doodle} className="h-14 w-14 opacity-80" />
                {label && (
                    <span className="font-[family-name:var(--font-hand)] text-lg leading-none opacity-70">
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
}
