import Link from "next/link";
import { ArrowRight } from "lucide-react";

const DRAFTS = [
    {
        href: "/drafts/editorial",
        label: "시안 A",
        name: "에디토리얼 저널",
        concept: "종이 매거진처럼 천천히 읽히는 홈. 신뢰감 있는 세리프 타이포와 괘선, 넓은 여백으로 ‘깊이 있는 교육 미디어’를 강조합니다.",
        points: ["마스트헤드 + 3단 신문형 커버 스토리", "주제별 인덱스와 ‘많이 읽은 글’ 랭킹", "인용문 스타일의 대표 질문 + 대화 리스트", "지역별 학원·교재·앱 비교 표", "뉴스레터 구독으로 재방문 유도"],
        fit: "매거진·큐레이션 콘텐츠가 서비스의 중심일 때",
        palette: ["#f4f1ea", "#1d1b18", "#2e3a32", "#c4623a", "#ebe5d8"],
        sample: "font-display",
        tone: "bg-paper",
    },
    {
        href: "/drafts/hub",
        label: "시안 B",
        name: "커뮤니티 허브",
        concept: "검색과 참여를 앞세운 앱 같은 홈. 벤토 그리드와 파스텔 카드, 실시간 지표로 ‘지금 함께 이야기하는 곳’이라는 활기를 전합니다.",
        points: ["검색 중심 히어로 + 실시간 활동 피드", "6개 카테고리 바로가기", "베스트 답변·답변 대기·투표가 섞인 벤토 그리드", "지역 × 과목 맞춤 추천 패널", "모바일 하단 탭바와 글쓰기 버튼"],
        fit: "커뮤니티 참여와 추천 기능이 핵심 지표일 때",
        palette: ["#f6f3ec", "#1d1b18", "#c4623a", "#dde5d0", "#f4e7b9", "#e2dcf0"],
        sample: "font-kr font-black",
        tone: "bg-white",
    },
];

export default function DraftsIndexPage() {
    return (
        <div className="min-h-screen bg-paper-deep px-5 py-14 text-ink md:px-10 md:py-20">
            <div className="mx-auto max-w-6xl">
                <p className="text-sm font-semibold text-terracotta">LUMIERE · 홈 리디자인</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">홈 화면 디자인 시안 2종</h1>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink/60">
                    같은 콘텐츠(매거진, 커뮤니티, 큐레이션, 학원·교재 추천)를 두 가지 방향으로 정리했습니다. 각 시안은 데스크톱과 모바일 모두 대응하며, 화면 하단의 전환 버튼으로 바로 비교할 수 있습니다.
                </p>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {DRAFTS.map((draft) => (
                        <Link key={draft.href} href={draft.href} className={`group flex flex-col rounded-[28px] p-7 shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-lg md:p-9 ${draft.tone}`}>
                            <div className="flex items-center justify-between">
                                <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-paper">{draft.label}</span>
                                <div className="flex -space-x-1.5">
                                    {draft.palette.map((color) => (
                                        <span key={color} className="h-6 w-6 rounded-full ring-2 ring-white" style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                            </div>
                            <h2 className={`mt-8 text-4xl tracking-tight md:text-5xl ${draft.sample}`}>{draft.name}</h2>
                            <p className="mt-4 leading-relaxed text-ink/65">{draft.concept}</p>
                            <ul className="mt-6 space-y-2 text-sm">
                                {draft.points.map((point) => (
                                    <li key={point} className="flex gap-2">
                                        <span aria-hidden className="text-terracotta">—</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 rounded-2xl bg-ink/[0.04] px-4 py-3 text-sm text-ink/70">
                                <span className="font-semibold text-ink">추천 상황</span> · {draft.fit}
                            </p>
                            <span className="mt-8 inline-flex items-center gap-1.5 font-semibold">
                                시안 보기 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>

                <section className="mt-14 rounded-[28px] bg-paper p-7 md:p-9">
                    <h2 className="text-lg font-bold">두 시안 공통 개선 사항</h2>
                    <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm leading-relaxed text-ink/70 md:grid-cols-2">
                        <li>· 영문 더미 기사 → 서비스 주제에 맞는 한국어 콘텐츠로 교체</li>
                        <li>· 외부 이미지 의존 제거, 브랜드 팔레트의 자체 일러스트 사용</li>
                        <li>· 한글 본문용 Noto Sans KR / 제목용 Noto Serif KR 적용</li>
                        <li>· 홈에서 학원·교재 추천 기능까지 바로 진입 가능</li>
                        <li>· 답변 대기 질문을 노출해 참여 유도</li>
                        <li>· 모바일 390px 기준 가로 스크롤 없이 대응</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
