import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { SingleDocentsCard } from '@/containers';
import { useGetSingleDocents } from '@/apis';
import { QueryParser } from '@/utils';

const SingleDocentsPage = () => {
  const router = useRouter();
  const { data: singleDocents } = useGetSingleDocents(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <SingleDocentsCard data={singleDocents} />
      </ResponsiveLayout>
    </>
  );
};

export default SingleDocentsPage;
