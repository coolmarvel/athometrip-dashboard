// 세션 세부 정보를 관리하기 위한 사용자 데이터의 인터페이스와 유형 정의

import { User } from 'next-auth';

/**
 * 사용자 세션 관리를 위한 예상 속성 지정
 */
type UserType = User & {
  userId: string;
  userName: string;
  emailAddress: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
}

/**
 * 백엔드에서 수신한 사용자 데이터 형식 지정
 */
type UserResponseType = {
  userId: string;
  userName: string;
  emailAddress: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
}

export type { UserType, UserResponseType };
