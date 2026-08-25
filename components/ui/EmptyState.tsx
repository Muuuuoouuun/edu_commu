import { cn } from "@/lib/utils";

export function EmptyState({
    title,
    description,
    action,
    className,
}: {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex flex-col items-center gap-3 border-y border-rule px-6 py-20 text-center",
                className
            )}
        >
            <p className="font-[family-name:var(--font-display)] text-xl">{title}</p>
            {description && (
                <p className="max-w-sm text-sm leading-relaxed text-graphite-soft">
                    {description}
                </p>
            )}
            {action && <div className="mt-3">{action}</div>}
        </div>
    );
}
