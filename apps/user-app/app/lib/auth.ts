import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface Credentials {
    phone: string;
    password: string;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Phone Number',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            // TODO: User credentials type from next-auth
            //   @ts-expect-error
            async authorize(credentials: Credentials) {
                // Do zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email,
                            number: existingUser.number
                        };
                    }
                    return {
                        error: "Invalid credentials"
                    };
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });

                    // Create a corresponding balance entry
                    await db.balance.create({
                        data: {
                            userId: user.id,
                            amount: 0, // Initial amount
                            locked: 0 // Initial locked status
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email,
                        number: user.number
                    };
                } catch (e) {
                    console.error(e);
                }

                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub;

            return session;
        }
    }
};