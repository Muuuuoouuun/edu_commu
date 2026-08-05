import { cn } from "@/lib/utils";
import { Doodle, type DoodleName } from "./Sketch";

export function EmptyState({
    doodle = "note",
    title,
    description,
    action,
    className,
}: {
    doodle?: DoodleName;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "sketch-frame flex flex-col items-center gap-3 bg-paper-raised px-6 py-14 text-center",
                className
            )}
        >
            <Doodle name={doodle} className="h-14 w-14 text-rule-strong" />
            <p className="text-base font-semibold text-graphite">{title}</p>
            {description && (
                <p className="max-w-sm text-sm leading-relaxed text-graphite-soft">
                    {description}
                </p>
            )}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
