import { satisfies } from 'next/dist/lib/semver-noop';
import nextauth from '../../auth';

declare module 'next-auth/jwt' {
  interface JWT extends UserType {
    access_token: string;
    expires_at: number
    refresh_token?: string;
    error?: 'RefreshTokenError';
  }
} satisfies(nextauth)

declare module 'next-auth' {
  type UserSession = DefaultSession['user'] & { userId: string };

  interface Session {
    user: UserSession;
    error?: 'RefreshTokenError';
  }

  interface User extends UserType {
    userId: string;
    accessToken: string;
    refreshToken: string;
    roles: string[];
  }
}
