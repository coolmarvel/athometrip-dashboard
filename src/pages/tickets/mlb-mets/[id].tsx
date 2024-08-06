import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { MLBMetsCard } from '@/containers';
import { useGetMLBMets } from '@/apis';
import { QueryParser } from '@/utils';

const MLBMetsPage = () => {
  const router = useRouter();
  const { data: mlbMets } = useGetMLBMets(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <MLBMetsCard data={mlbMets} />
      </ResponsiveLayout>
    </>
  );
};

export default MLBMetsPage;
