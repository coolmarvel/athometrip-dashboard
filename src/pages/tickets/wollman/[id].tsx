import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { WollmanCard } from '@/containers';
import { useGetWollman } from '@/apis';
import { QueryParser } from '@/utils';

const WollmanPage = () => {
  const router = useRouter();
  const { data: wollman } = useGetWollman(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <WollmanCard data={wollman} />
      </ResponsiveLayout>
    </>
  );
};

export default WollmanPage;
