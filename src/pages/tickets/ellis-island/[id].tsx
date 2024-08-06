import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { EllisIslandCard } from '@/containers';
import { useGetEllisIsland } from '@/apis';
import { QueryParser } from '@/utils';

const EllisIslandPage = () => {
  const router = useRouter();
  const { data: ellisIsland } = useGetEllisIsland(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <EllisIslandCard data={ellisIsland} />
      </ResponsiveLayout>
    </>
  );
};

export default EllisIslandPage;
