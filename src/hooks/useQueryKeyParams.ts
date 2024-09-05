import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { QueryKey } from '@/apis';

const useQueryKeyParams = (queryKey: QueryKey[0]) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return queryClient
    .getQueryCache()
    .findAll([queryKey])
    .find((query) => {
      if (!query.queryKey[1]) return false;
      return Object.entries(query.queryKey[1]).reduce((isMatch, [key, value]) => {
        return isMatch && router.query[key] === value.toString();
      }, true);
    })?.queryKey[1] as QueryKey[1];
};

export default useQueryKeyParams;
