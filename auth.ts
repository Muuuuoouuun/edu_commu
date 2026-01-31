import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
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
