import { useGetModern } from '@/apis';
import { ResponsiveLayout } from '@/components';
import { ModernCard } from '@/containers';
import { QueryParser } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ModernPage = () => {
  const router = useRouter();
  const { data: modern } = useGetModern(QueryParser.toNumber(router.query.id));

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout>
        <ModernCard data={modern} />
      </ResponsiveLayout>
    </>
  );
};

export default ModernPage;
