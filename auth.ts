import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
    // Vercel 밖에 배포하면 Auth.js가 Host 헤더를 신뢰하지 않아 세션 API가 500을 낸다.
    // 리버스 프록시 뒤에서 도메인이 고정되는 일반적인 자체 호스팅 구성을 전제로 켠다.
    trustHost: true,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // Mock User for MVP (replace with DB call later)
                    if (email === "test@example.com") {
                        return {
                            id: "1",
                            name: "Test User",
                            email: "test@example.com",
                        }
                    }
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
})
