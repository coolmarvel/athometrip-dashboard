import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { MomaDocentCard } from '@/containers';
import { useGetMomaDocent } from '@/apis';
import { QueryParser } from '@/utils';

const MomaDocentPage = () => {
  const router = useRouter();
  const { data: momaDocent } = useGetMomaDocent(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <MomaDocentCard data={momaDocent} />
      </ResponsiveLayout>
    </>
  );
};

export default MomaDocentPage;
