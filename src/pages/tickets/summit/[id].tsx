import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { SummitCard } from '@/containers';
import { useGetSummit } from '@/apis';
import { QueryParser } from '@/utils';

const SummitPage = () => {
  const router = useRouter();
  const { data: summit } = useGetSummit(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <SummitCard data={summit} />
      </ResponsiveLayout>
    </>
  );
};

export default SummitPage;
