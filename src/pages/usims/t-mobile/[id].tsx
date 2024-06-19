import { useGetTMobile } from '@/apis';
import { ResponsiveLayout } from '@/components';
import { TMobileCard } from '@/containers';
import { QueryParser } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';

const TMobilePage = () => {
  const router = useRouter();
  const { data: tMobile } = useGetTMobile(QueryParser.toNumber(router.query.id));

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout>
        <TMobileCard data={tMobile} />
      </ResponsiveLayout>
    </>
  );
};

export default TMobilePage;
