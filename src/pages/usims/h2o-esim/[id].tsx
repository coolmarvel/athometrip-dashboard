import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { H2OEsimCard } from '@/containers';
import { useGetH2OEsim } from '@/apis';
import { QueryParser } from '@/utils';

const H2OEsimPage = () => {
  const router = useRouter();
  const { data: h2oEsim } = useGetH2OEsim(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <H2OEsimCard data={h2oEsim} />
      </ResponsiveLayout>
    </>
  );
};

export default H2OEsimPage;
