import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { MetroDocentCard } from '@/containers';
import { useGetMetroDocent } from '@/apis';
import { QueryParser } from '@/utils';

const MetroDocentPage = () => {
  const router = useRouter();
  const { data: metroDocent } = useGetMetroDocent(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <MetroDocentCard data={metroDocent} />
      </ResponsiveLayout>
    </>
  );
};

export default MetroDocentPage;
