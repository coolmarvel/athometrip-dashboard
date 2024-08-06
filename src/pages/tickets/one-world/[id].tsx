import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { OneWorldCard } from '@/containers';
import { useGetOneWorld } from '@/apis';
import { QueryParser } from '@/utils';

const OneWorldPage = () => {
  const router = useRouter();
  const { data: oneWorld } = useGetOneWorld(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <OneWorldCard data={oneWorld} />
      </ResponsiveLayout>
    </>
  );
};

export default OneWorldPage;
