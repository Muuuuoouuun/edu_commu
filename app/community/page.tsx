import type { Metadata } from "next";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
    title: "커뮤니티",
    description: "학습 고민과 학원·교재 후기를 나누는 공간입니다.",
};

export default function CommunityPage() {
    return (
        <>
            <PageHeader
                eyebrow="같이 고민하는 사람들"
                title="커뮤니티"
                description="질문이든 후기든, 지금 떠오른 그대로 적어주세요. 다듬는 건 나중 일입니다."
            />
            <CommunitySection />
        </>
    );
}
