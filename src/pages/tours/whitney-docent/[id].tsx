import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { WhitneyDocentCard } from '@/containers';
import { useGetWhitneyDocent } from '@/apis';
import { QueryParser } from '@/utils';

const WhitneyDocentPage = () => {
  const router = useRouter();
  const { data: whitneyDocent } = useGetWhitneyDocent(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <WhitneyDocentCard data={whitneyDocent} />
      </ResponsiveLayout>
    </>
  );
};

export default WhitneyDocentPage;
