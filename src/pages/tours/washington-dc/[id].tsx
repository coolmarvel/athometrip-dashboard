import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { WashingtonDCCard } from '@/containers';
import { useGetWashingtonDC } from '@/apis';
import { QueryParser } from '@/utils';

const WashingtonDCPage = () => {
  const router = useRouter();
  const { data: washingtonDC } = useGetWashingtonDC(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <WashingtonDCCard data={washingtonDC} />
      </ResponsiveLayout>
    </>
  );
};

export default WashingtonDCPage;
