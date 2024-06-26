import { useGetLyca } from '@/apis';
import { ResponsiveLayout } from '@/components';
import { LycaCard } from '@/containers';
import { QueryParser } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';

const LycaPage = () => {
  const router = useRouter();
  const { data: lyca } = useGetLyca(QueryParser.toNumber(router.query.id));

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout>
        <LycaCard data={lyca} />
      </ResponsiveLayout>
    </>
  );
};

export default LycaPage;
