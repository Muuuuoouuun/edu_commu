import type { Metadata } from "next";
import { RecommendBrowser } from "./RecommendBrowser";
import { getBookCovers } from "@/lib/recommend-data";

export const metadata: Metadata = {
    title: "학원·교재 추천",
    description: "지역과 관심 과목으로 학원, 교재, 학습 앱을 추려 보여드립니다.",
};

/** 표지는 서버에서 하루 단위로 캐싱해 가져온다 (lib/recommend-data.ts) */
export default async function RecommendPage() {
    const coverMap = await getBookCovers();
    return <RecommendBrowser coverMap={coverMap} />;
}
