import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { UNTourCard } from '@/containers';
import { useGetUNTour } from '@/apis';
import { QueryParser } from '@/utils';

const UNTourPage = () => {
  const router = useRouter();
  const { data: unTour } = useGetUNTour(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <UNTourCard data={unTour} />
      </ResponsiveLayout>
    </>
  );
};

export default UNTourPage;
