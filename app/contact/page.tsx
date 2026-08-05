import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Sketch";

export const metadata: Metadata = {
    title: "문의하기",
    description: "궁금한 점이나 하고 싶은 이야기를 남겨주세요.",
};

const FIELD_CLASS =
    "w-full rounded-[14px] border border-rule bg-paper-sunken px-4 py-3 text-sm transition-colors focus:border-lamp";

export default function ContactPage() {
    return (
        <>
            <PageHeader
                eyebrow="무슨 이야기든 좋아요"
                title="문의하기"
                description="불편한 점, 있으면 좋겠는 기능, 잘못된 정보 제보까지 편하게 남겨주세요. 읽고 답장드립니다."
                doodle="note"
            />

            <div className="container-read py-14">
                <div className="paper-card p-6 sm:p-8">
                    <form className="space-y-5">
                        <div>
                            <label
                                htmlFor="contact-email"
                                className="mb-1.5 block text-sm font-semibold"
                            >
                                답장 받을 이메일
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                className={FIELD_CLASS}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact-topic"
                                className="mb-1.5 block text-sm font-semibold"
                            >
                                어떤 이야기인가요?
                            </label>
                            <select id="contact-topic" className={FIELD_CLASS}>
                                <option>서비스 이용 문의</option>
                                <option>잘못된 정보 제보</option>
                                <option>제휴·광고 문의</option>
                                <option>기타</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="contact-message"
                                className="mb-1.5 block text-sm font-semibold"
                            >
                                내용
                            </label>
                            <textarea
                                id="contact-message"
                                rows={6}
                                placeholder="편하게 적어주세요."
                                className={`${FIELD_CLASS} resize-none`}
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full sm:w-auto">
                            보내기
                        </Button>
                    </form>
                </div>

                <div className="mt-8 flex items-start gap-3 rounded-[18px] border border-dashed border-rule-strong p-5">
                    <Doodle name="mug" className="h-8 w-8 shrink-0 text-wood" />
                    <p className="text-sm leading-relaxed text-graphite-soft">
                        답장은 보통 평일 기준 2~3일 안에 드립니다. 급한 제보라면
                        내용 맨 앞에 &lsquo;긴급&rsquo;이라고 적어주세요.
                    </p>
                </div>
            </div>
        </>
    );
}
