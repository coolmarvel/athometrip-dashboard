import { useGetMLBMets } from '@/apis';
import { ResponsiveLayout } from '@/components';
import { MLBMetsCard } from '@/containers';
import { QueryParser } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';

const MLBMetsPage = () => {
  const router = useRouter();
  const { data: mlbMets } = useGetMLBMets(QueryParser.toNumber(router.query.id));

  console.log(mlbMets);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout>
        <MLBMetsCard data={mlbMets} />
      </ResponsiveLayout>
    </>
  );
};

export default MLBMetsPage;