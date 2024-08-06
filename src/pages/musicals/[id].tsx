import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { MusicalsCard } from '@/containers';
import { useGetMusicals } from '@/apis';
import { QueryParser } from '@/utils';

const MusicalsPage = () => {
  const router = useRouter();
  const { data: musicals } = useGetMusicals(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <MusicalsCard data={musicals} />
      </ResponsiveLayout>
    </>
  );
};

export default MusicalsPage;
