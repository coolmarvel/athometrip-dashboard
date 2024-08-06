import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { ToEWRCard } from '@/containers';
import { QueryParser } from '@/utils';
import { useGetToEWR } from '@/apis';

const ToEWRPage = () => {
  const router = useRouter();
  const { data: toEWR } = useGetToEWR(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <ToEWRCard data={toEWR} />
      </ResponsiveLayout>
    </>
  );
};

export default ToEWRPage;
