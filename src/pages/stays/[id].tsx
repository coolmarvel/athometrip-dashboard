import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { StaysCard } from '@/containers';
import { useGetStays } from '@/apis';
import { QueryParser } from '@/utils';

const StaysPage = () => {
  const router = useRouter();
  const { data: stays } = useGetStays(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <StaysCard data={stays} />
      </ResponsiveLayout>
    </>
  );
};

export default StaysPage;
