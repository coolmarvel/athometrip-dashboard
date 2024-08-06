import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { LycaCard } from '@/containers';
import { QueryParser } from '@/utils';
import { useGetLyca } from '@/apis';

const LycaPage = () => {
  const router = useRouter();
  const { data: lyca } = useGetLyca(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <LycaCard data={lyca} />
      </ResponsiveLayout>
    </>
  );
};

export default LycaPage;
