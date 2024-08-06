import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { NiagaraTwoDaysCard } from '@/containers';
import { useGetNiagaraTwoDays } from '@/apis';
import { QueryParser } from '@/utils';

const NiagaraTwoDaysPage = () => {
  const router = useRouter();
  const { data: niagara } = useGetNiagaraTwoDays(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <NiagaraTwoDaysCard data={niagara} />
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraTwoDaysPage;
