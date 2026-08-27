import { HeroSection } from "@/components/sections/HeroSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { MagazineCarousel } from "@/components/sections/MagazineCarousel";

/**
 * 히어로 통계를 글 데이터에서 세므로 요청마다 다시 렌더링한다.
 * 정적으로 두면 빌드 시점 숫자가 그대로 굳는다.
 */
export const dynamic = "force-dynamic";

/**
 * 커뮤니티가 먼저, 매거진이 마지막.
 * 질문과 후기가 이 서비스의 본체이고 읽을거리는 그 뒤에 붙는다.
 */
export default function Home() {
    return (
        <>
            <HeroSection />
            <CommunitySection limit={4} />
            <MagazineCarousel />
        </>
    );
}
