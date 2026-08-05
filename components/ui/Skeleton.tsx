import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={cn("animate-pulse rounded-md bg-paper-sunken", className)}
        />
    );
}

/** 커뮤니티 글 카드 로딩 자리표시 */
export function PostSkeleton() {
    return (
        <div className="paper-card p-5">
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
            <div className="mt-5 space-y-2.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
            </div>
        </div>
    );
}
