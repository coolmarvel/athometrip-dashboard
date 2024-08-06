import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { BostonCard } from '@/containers';
import { useGetBoston } from '@/apis';
import { QueryParser } from '@/utils';

const BostonPage = () => {
  const router = useRouter();
  const { data: boston } = useGetBoston(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <BostonCard data={boston} />
      </ResponsiveLayout>
    </>
  );
};

export default BostonPage;
