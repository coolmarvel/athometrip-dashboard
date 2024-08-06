import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { Memorial911Card } from '@/containers';
import { useGet911Memorial } from '@/apis';
import { QueryParser } from '@/utils';

const Memorial911Page = () => {
  const router = useRouter();
  const { data: memorial911 } = useGet911Memorial(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Memorial911Card data={memorial911} />
      </ResponsiveLayout>
    </>
  );
};

export default Memorial911Page;
