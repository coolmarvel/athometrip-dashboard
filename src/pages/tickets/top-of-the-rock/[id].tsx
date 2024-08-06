import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { TopOfTheRockCard } from '@/containers';
import { useGetTopOfTheRock } from '@/apis';
import { QueryParser } from '@/utils';

const TopOfTheRockPage = () => {
  const router = useRouter();
  const { data: topOfTheRock } = useGetTopOfTheRock(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <TopOfTheRockCard data={topOfTheRock} />
      </ResponsiveLayout>
    </>
  );
};

export default TopOfTheRockPage;
