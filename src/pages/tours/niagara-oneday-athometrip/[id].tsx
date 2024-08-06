import { useRouter } from 'next/router';

import { NiagaraOneDayAthometripCard } from '@/containers';
import { GaiaHead, ResponsiveLayout } from '@/components';
import { useGetNiagaraOneDayAthometrip } from '@/apis';
import { QueryParser } from '@/utils';

const NiagaraOneDayAthometripPage = () => {
  const router = useRouter();
  const { data: niagara } = useGetNiagaraOneDayAthometrip(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <NiagaraOneDayAthometripCard data={niagara} />
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraOneDayAthometripPage;
