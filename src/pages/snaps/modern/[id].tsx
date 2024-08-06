import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { ModernCard } from '@/containers';
import { useGetModern } from '@/apis';
import { QueryParser } from '@/utils';

const ModernPage = () => {
  const router = useRouter();
  const { data: modern } = useGetModern(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <ModernCard data={modern} />
      </ResponsiveLayout>
    </>
  );
};

export default ModernPage;
