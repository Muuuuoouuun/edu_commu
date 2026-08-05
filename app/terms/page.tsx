import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
    title: "이용약관",
};

export default function TermsPage() {
    return (
        <>
            <PageHeader
                eyebrow="서로 지켰으면 하는 것들"
                title="이용약관"
                description="최종 수정일 2026년 2월 1일"
            />

            <div className="container-read py-14">
                <Prose>
                    <p>
                        책상서랍(이하 &lsquo;서비스&rsquo;)을 이용해 주셔서 고맙습니다.
                        이 약관은 서비스를 이용하는 데 필요한 기본 규칙을 담고 있습니다.
                    </p>

                    <h2>1. 약관의 적용</h2>
                    <p>
                        서비스에 가입하거나 이용하는 순간 이 약관에 동의한 것으로
                        봅니다. 동의하지 않는 경우 서비스 이용을 중단해 주세요.
                    </p>

                    <h2>2. 계정</h2>
                    <p>
                        계정은 본인이 직접 관리해야 하며, 비밀번호 관리 소홀로
                        생긴 문제에 대해서는 서비스가 책임지지 않습니다. 타인의
                        계정을 도용하는 행위는 금지됩니다.
                    </p>

                    <h2>3. 게시물</h2>
                    <p>
                        작성한 글의 권리는 작성자에게 있습니다. 다만 서비스 운영과
                        노출에 필요한 범위에서 게시물을 사용할 수 있습니다.
                        아래에 해당하는 게시물은 사전 통보 없이 삭제될 수 있습니다.
                    </p>
                    <ul>
                        <li>타인을 비방하거나 차별하는 내용</li>
                        <li>허위 후기 또는 광고 목적을 숨긴 홍보성 글</li>
                        <li>개인정보나 저작권을 침해하는 내용</li>
                    </ul>

                    <h2>4. 후기와 추천에 대하여</h2>
                    <p>
                        학원·교재·앱에 대한 후기와 추천은 이용자와 편집팀의 의견이며,
                        학습 결과를 보장하지 않습니다. 광고가 포함된 영역에는
                        &lsquo;광고&rsquo; 표기를 붙여 구분합니다.
                    </p>

                    <h2>5. 약관의 변경</h2>
                    <p>
                        약관이 바뀌는 경우 시행일 7일 전에 서비스 안에서 알립니다.
                        이용자에게 불리한 변경이라면 30일 전에 알립니다.
                    </p>
                </Prose>
            </div>
        </>
    );
}
