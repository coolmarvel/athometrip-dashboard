import { ResponsiveLayout } from '@/components';
import { Memorial911Card } from '@/containers';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Memorial911Page = () => {
  const router = useRouter();
  // const {data:memorial911} =''

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout>
        {/* <Memorial911Card data={memorial911} /> */}
      </ResponsiveLayout>
    </>
  );
};
