import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
} as const;

/** 이름 기반으로 실내 팔레트 안에서 배경색을 고정 배정 */
const TINTS = [
    "bg-lamp-wash text-lamp-ink",
    "bg-plant-wash text-plant",
    "bg-eraser-wash text-eraser",
    "bg-paper-sunken text-wood",
];

function tintFor(name: string) {
    let sum = 0;
    for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i);
    return TINTS[sum % TINTS.length];
}

export function Avatar({
    name,
    src,
    size = "md",
    className,
}: {
    name: string;
    src?: string;
    size?: keyof typeof SIZES;
    className?: string;
}) {
    const initial = name.trim().charAt(0) || "?";

    return (
        <span
            className={cn(
                "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-rule",
                SIZES[size],
                !src && tintFor(name),
                className
            )}
        >
            {src ? (
                <Image src={src} alt="" fill sizes="48px" className="object-cover" />
            ) : (
                <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-hand)] text-[1.15em] leading-none"
                >
                    {initial}
                </span>
            )}
        </span>
    );
}
