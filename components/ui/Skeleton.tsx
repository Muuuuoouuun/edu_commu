import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={cn("animate-pulse bg-paper-sunken", className)}
        />
    );
}

/** 커뮤니티 목록 행의 로딩 자리표시 */
export function RowSkeleton() {
    return (
        <div className="flex items-baseline gap-10 border-b border-rule py-7">
            <Skeleton className="h-3.5 w-10 shrink-0" />
            <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-3.5 w-full max-w-lg" />
            </div>
            <div className="hidden w-40 shrink-0 space-y-2 sm:block">
                <Skeleton className="ml-auto h-3.5 w-16" />
                <Skeleton className="ml-auto h-3.5 w-24" />
            </div>
        </div>
    );
}
