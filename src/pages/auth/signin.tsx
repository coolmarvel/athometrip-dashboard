import { CenteredLayout, GaiaHead } from '@/components';
import { SigninForm } from '@/containers';

const SigninPage = () => {
  return (
    <>
      <GaiaHead />
      <CenteredLayout>
        <SigninForm />
      </CenteredLayout>
    </>
  );
};

export default SigninPage;
