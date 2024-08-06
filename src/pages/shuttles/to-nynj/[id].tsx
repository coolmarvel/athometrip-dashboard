import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { ToNYNJCard } from '@/containers';
import { useGetToNYNJ } from '@/apis';
import { QueryParser } from '@/utils';

const ToNYNJPage = () => {
  const router = useRouter();
  const { data: toNYNJ } = useGetToNYNJ(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <ToNYNJCard data={toNYNJ} />
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNJPage;
