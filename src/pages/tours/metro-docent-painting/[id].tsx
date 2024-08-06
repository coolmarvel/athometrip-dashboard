import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { MetroDocentPaintingCard } from '@/containers';
import { useGetMetroDocentPainting } from '@/apis';
import { QueryParser } from '@/utils';

const MetroDocentPaintingPage = () => {
  const router = useRouter();
  const { data: metroDocentPainting } = useGetMetroDocentPainting(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <MetroDocentPaintingCard data={metroDocentPainting} />
      </ResponsiveLayout>
    </>
  );
};

export default MetroDocentPaintingPage;
