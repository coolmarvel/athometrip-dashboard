import Alert from './Alert';
import Modals from './Modals';
import Confirm from './Confirm';

const ModalProvider = () => {
  return (
    <>
      <Alert />
      <Confirm />
      <Modals />
    </>
  );
};

export default ModalProvider;
