import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { ToNYNJEWRCard } from '@/containers';
import { useGetToNYNJEWR } from '@/apis';
import { QueryParser } from '@/utils';

const ToNYNJEWRPage = () => {
  const router = useRouter();
  const { data: toNYNJEWR } = useGetToNYNJEWR(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <ToNYNJEWRCard data={toNYNJEWR} />
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNJEWRPage;
