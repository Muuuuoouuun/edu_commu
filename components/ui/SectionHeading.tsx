import { cn } from "@/lib/utils";
import { PencilUnderline } from "./Sketch";

export function SectionHeading({
    eyebrow,
    title,
    description,
    action,
    className,
}: {
    /** 손글씨로 적은 짧은 라벨 */
    eyebrow?: string;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
                className
            )}
        >
            <div className="max-w-2xl">
                {eyebrow && <p className="hand-label mb-2.5">{eyebrow}</p>}
                <h2 className="relative inline-block text-2xl leading-snug sm:text-3xl">
                    {title}
                    <PencilUnderline className="absolute -bottom-1.5 left-0 h-2 w-full" />
                </h2>
                {description && (
                    <p className="mt-4 text-[15px] leading-relaxed text-graphite-soft">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
