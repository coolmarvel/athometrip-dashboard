import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { VintageCard } from '@/containers';
import { useGetVintage } from '@/apis';
import { QueryParser } from '@/utils';

const VintagePage = () => {
  const router = useRouter();
  const { data: vintage } = useGetVintage(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <VintageCard data={vintage} />
      </ResponsiveLayout>
    </>
  );
};

export default VintagePage;
