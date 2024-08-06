import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { NiagaraOneDayKingKongCard } from '@/containers';
import { useGetNiagaraOneDayKingKong } from '@/apis';
import { QueryParser } from '@/utils';

const NiagaraOneDayKingKongPage = () => {
  const router = useRouter();
  const { data: niagara } = useGetNiagaraOneDayKingKong(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <NiagaraOneDayKingKongCard data={niagara} />
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraOneDayKingKongPage;
