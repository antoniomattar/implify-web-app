'use server';
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "../auth.config";
import type { User } from "@/lib/User";
// TO BE USED IF PASSED TO DATABASE FOR LOGIN

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        // Static login credentials for demonstration purposes
        const adminCredentials = { email: "admin@implify.com", password: "password" };

        if (credentials && credentials.email === adminCredentials.email && credentials.password === adminCredentials.password) {
          // Return a user object to signify successful login
          return {
            id: '1',
            name: "Admin",
            email: "admin@implify.com",
            password: "pass",
          };
        } else {
          // Return null to signify failed login
          return null;
        }
      }
    })
  ],
});
