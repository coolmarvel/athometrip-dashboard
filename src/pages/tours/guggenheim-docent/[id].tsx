import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { GuggenheimDocentCard } from '@/containers';
import { useGetGuggenheimDocent } from '@/apis';
import { QueryParser } from '@/utils';

const GuggenheimDocentPage = () => {
  const router = useRouter();
  const { data: guggenheimDocent } = useGetGuggenheimDocent(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <GuggenheimDocentCard data={guggenheimDocent} />
      </ResponsiveLayout>
    </>
  );
};

export default GuggenheimDocentPage;
