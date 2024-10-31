import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInSchema } from './lib/zod';
import { UserType, UserResponseType } from '@/types/user';

/**
 * Auth.js 라이브러리 적용
 *
 * @author 김이안
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        userId: { label: "UserId", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw { message: 'Missing credentials' };
        }
        try {
          const { userId, password } = await signInSchema.parseAsync(credentials);

          const user = await fetchUser(`${process.env.NEXT_PUBLIC_API_SIGNIN}`, {
            userId: userId,
            password: password,
          });

          console.log(user);
          // useGetSession <- session 데이터 확인 가능

          return user ? createUser(user) : null;
        } catch (error) {
          console.error('Error creating user', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      token.userId = user?.userId;
      token.accessToken = user?.accessToken;
      token.accessTokenExpires = Date.now() + 60 * 60 * 1000; // 1시간 후 만료

      // 토큰 만료 시 재발급 로직
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      // Refresh token 로직 추가
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_REFRESH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token.refreshToken, userId: user.userId }),
      });
      const refreshedTokens = await response.json();
      if (!response.ok) {
        throw { message: 'RefreshAccessTokenError' };
      }
      token.accessToken = refreshedTokens.access_token;
      token.accessTokenExpires = Date.now() + refreshedTokens.expires_in * 1000;
      token.roles = refreshedTokens.roles;
      return token;
    },
    async session({ session, token }) {
      session.user.userId = token.userId as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string; // Redis 저장 예정
      session.user.roles = token.roles as string[];
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
})

async function fetchUser(url: string, body: {}): Promise<UserResponseType | null> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`API call failed: ${res.status} ${res.statusText}`);
      return null;
    }
    const user = await res.json();
    return user ? user : null;
  } catch (error) {
    console.error(`Error during fetch: ${error}`);
    return null;
  }
}

function createUser(user: UserResponseType): UserType {
  return {
    userId: user.userId,
    userName: user.userName,
    emailAddress: user.emailAddress,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    roles: user.roles,
  } as UserType;
}
