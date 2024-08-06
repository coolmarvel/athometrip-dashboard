import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { EmpireCard } from '@/containers';
import { useGetEmpire } from '@/apis';
import { QueryParser } from '@/utils';

const EmpirePage = () => {
  const router = useRouter();
  const { data: empire } = useGetEmpire(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <EmpireCard data={empire} />
      </ResponsiveLayout>
    </>
  );
};

export default EmpirePage;
