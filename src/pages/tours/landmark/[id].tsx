import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { LandmarkCard } from '@/containers';
import { useGetLandmark } from '@/apis';
import { QueryParser } from '@/utils';

const LandmarkPage = () => {
  const router = useRouter();
  const { data: landmark } = useGetLandmark(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <LandmarkCard data={landmark} />
      </ResponsiveLayout>
    </>
  );
};

export default LandmarkPage;
