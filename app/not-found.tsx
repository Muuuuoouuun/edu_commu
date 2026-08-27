import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="container-read flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
            <p className="eyebrow mt-6">페이지를 찾지 못했어요</p>
            <h1 className="mt-3 text-3xl">여기엔 아무것도 없네요</h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-graphite-soft">
                주소가 바뀌었거나 글이 삭제되었을 수 있습니다. 홈에서 다시
                찾아보시겠어요?
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/" className={buttonStyles({ size: "lg" })}>
                    홈으로 가기
                </Link>
                <Link
                    href="/community"
                    className={buttonStyles({ variant: "outline", size: "lg" })}
                >
                    커뮤니티 둘러보기
                </Link>
            </div>
        </div>
    );
}
