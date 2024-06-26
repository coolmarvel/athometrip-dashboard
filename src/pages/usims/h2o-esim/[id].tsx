import { useGetH2OEsim } from '@/apis';
import { ResponsiveLayout } from '@/components';
import { H2OEsimCard } from '@/containers';
import { QueryParser } from '@/utils';
import Head from 'next/head';
import { useRouter } from 'next/router';

const H2OEsimPage = () => {
  const router = useRouter();
  const { data: h2oEsim } = useGetH2OEsim(QueryParser.toNumber(router.query.id));

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout>
        <H2OEsimCard data={h2oEsim} />
      </ResponsiveLayout>
    </>
  );
};

export default H2OEsimPage;
