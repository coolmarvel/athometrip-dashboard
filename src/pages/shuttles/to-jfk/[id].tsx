import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { ToJFKCard } from '@/containers';
import { QueryParser } from '@/utils';
import { useGetToJFK } from '@/apis';

const ToJFKPage = () => {
  const router = useRouter();
  const { data: toJFK } = useGetToJFK(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <ToJFKCard data={toJFK} />
      </ResponsiveLayout>
    </>
  );
};

export default ToJFKPage;
