import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { ToNYNightCard } from '@/containers';
import { useGetToNYNight } from '@/apis';
import { QueryParser } from '@/utils';

const ToNYNightPage = () => {
  const router = useRouter();
  const { data: toNYNight } = useGetToNYNight(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <ToNYNightCard data={toNYNight} />
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNightPage;
