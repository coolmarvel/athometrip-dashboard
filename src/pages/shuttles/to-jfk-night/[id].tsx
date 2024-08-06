import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { ToJFKNightCard } from '@/containers';
import { useGetToJFKNight } from '@/apis';
import { QueryParser } from '@/utils';

const ToJFKNightPage = () => {
  const router = useRouter();
  const { data: toJFKNight } = useGetToJFKNight(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <ToJFKNightCard data={toJFKNight} />
      </ResponsiveLayout>
    </>
  );
};

export default ToJFKNightPage;
