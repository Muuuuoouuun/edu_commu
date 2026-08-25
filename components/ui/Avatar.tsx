import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
} as const;

/** 색으로 사람을 구분하지 않는다 — 이니셜과 1px 테두리만 쓴다. */
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
                "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-rule bg-paper-sunken text-graphite-soft",
                SIZES[size],
                className
            )}
        >
            {src ? (
                <Image src={src} alt="" fill sizes="48px" className="object-cover" />
            ) : (
                <span aria-hidden="true" className="text-[1.05em] leading-none">
                    {initial}
                </span>
            )}
        </span>
    );
}
