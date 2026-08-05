import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
    title: "개인정보처리방침",
};

export default function PrivacyPage() {
    return (
        <>
            <PageHeader
                eyebrow="꼼꼼히 읽어보셔도 좋아요"
                title="개인정보처리방침"
                description="최종 수정일 2026년 2월 1일"
            />

            <div className="container-read py-14">
                <Prose>
                    <p>
                        책상서랍(이하 &lsquo;서비스&rsquo;)은 이용자의 개인정보를
                        소중히 다룹니다. 이 방침은 어떤 정보를 왜 모으고, 어떻게
                        보관하며, 언제 지우는지를 설명합니다.
                    </p>

                    <h2>1. 수집하는 정보</h2>
                    <p>
                        회원가입과 서비스 이용 과정에서 아래 정보를 수집합니다.
                    </p>
                    <ul>
                        <li>필수: 이메일 주소, 비밀번호, 닉네임</li>
                        <li>선택: 프로필 이미지, 관심 과목, 관심 지역</li>
                        <li>자동 수집: 접속 기록, 기기 정보, 쿠키</li>
                    </ul>

                    <h2>2. 이용 목적</h2>
                    <p>
                        수집한 정보는 계정 확인, 게시물 작성자 표시, 관심사 기반
                        추천, 문의 응대에 사용합니다. 이 외의 목적으로는 쓰지 않으며,
                        목적이 바뀌면 미리 알리고 동의를 받습니다.
                    </p>

                    <h2>3. 보관 기간</h2>
                    <p>
                        회원 탈퇴 시 계정 정보는 지체 없이 파기합니다. 다만 관계
                        법령에 따라 보존이 필요한 기록은 해당 기간 동안 별도로
                        분리해 보관합니다.
                    </p>

                    <h2>4. 제3자 제공</h2>
                    <p>
                        이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.
                        법령에 따른 요청이 있는 경우에만 절차에 따라 처리합니다.
                    </p>

                    <h2>5. 이용자의 권리</h2>
                    <p>
                        언제든지 본인의 정보를 조회·수정하거나 삭제를 요청할 수
                        있습니다. <a href="/contact">문의하기</a>를 통해 알려주시면
                        확인 후 처리해 드립니다.
                    </p>
                </Prose>
            </div>
        </>
    );
}
