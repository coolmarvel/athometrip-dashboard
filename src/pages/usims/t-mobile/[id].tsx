import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { TMobileCard } from '@/containers';
import { useGetTMobile } from '@/apis';
import { QueryParser } from '@/utils';

const TMobilePage = () => {
  const router = useRouter();
  const { data: tMobile } = useGetTMobile(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <TMobileCard data={tMobile} />
      </ResponsiveLayout>
    </>
  );
};

export default TMobilePage;
