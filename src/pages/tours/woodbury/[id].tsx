import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { WoodburyCard } from '@/containers';
import { useGetWoodbury } from '@/apis';
import { QueryParser } from '@/utils';

const WoodburyPage = () => {
  const router = useRouter();
  const { data: woodbury } = useGetWoodbury(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <WoodburyCard data={woodbury} />
      </ResponsiveLayout>
    </>
  );
};

export default WoodburyPage;
