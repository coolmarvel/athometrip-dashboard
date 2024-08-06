import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { AMNHDocentCard } from '@/containers';
import { useGetAMNHDocent } from '@/apis';
import { QueryParser } from '@/utils';

const AMNHDocentPage = () => {
  const router = useRouter();
  const { data: amnhDocent } = useGetAMNHDocent(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <AMNHDocentCard data={amnhDocent} />
      </ResponsiveLayout>
    </>
  );
};

export default AMNHDocentPage;
