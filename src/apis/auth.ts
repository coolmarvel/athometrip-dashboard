import { ApiRoutes, PageRoutes } from '@/constants';
import { Nullable } from '@/types';
import { toUrl } from '@/utils';
import { User, useFetch, usePost, useInvalidate } from '.';
import { useRouter } from 'next/router';

export interface AuthSignin {
  userId: User['userId'];
  password: User['password'];
}

/**
 * 로그인 API
 */
export const useSignin = () => {
  return usePost<unknown, AuthSignin, User>(toUrl(ApiRoutes.Signin), undefined, {
    onSuccess: useInvalidate(toUrl(ApiRoutes.Me)),
    meta: { successMessage: 'Signin successfully' },
  });
};

/**
 * 로그아웃 API
 */
export const useSignout = () => {
  const router = useRouter();
  const invalidate = useInvalidate(toUrl(ApiRoutes.Me));

  return usePost<unknown>(toUrl(ApiRoutes.Signout), undefined, {
    onSuccess: () => {
      router.push(PageRoutes.Signin);
      invalidate();
    },
    meta: { successMessage: 'Signout successfully' },
  });
};

export const useGetMe = () => {
  return useFetch<Nullable<User>>(toUrl(ApiRoutes.Me), undefined, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
