import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TbEdit } from 'react-icons/tb';

import { MemoUpdateForm } from './MemoUpdateForm';

interface WithLabelProps {
  id: any;
  label: string;
  value: string;
  after: string;
  before: string;
  isMemo?: boolean;
  isEdit?: boolean;
  onEdit?: () => void;
  setMutate: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const WithLabel = ({ id, label, value, after, before, isMemo, isEdit, onEdit, setIsEdit, setIsOpen, setMutate }: WithLabelProps) => {
  const { t } = useTranslation();
  const memoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEdit && memoRef.current) memoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isEdit]);

  return (
    <Flex direction={'column'} gap={'2'}>
      <Heading size="xs" textTransform="uppercase">
        {label}
        {isMemo && !isEdit && (
          <Button ml={'4'} size={'sm'} rightIcon={<TbEdit />} onClick={onEdit}>
            Edit
          </Button>
        )}
      </Heading>
      <div ref={memoRef}>
        {isEdit ? (
          <MemoUpdateForm id={id} memo={value} after={after} before={before} setIsEdit={setIsEdit} setIsOpen={setIsOpen} setMutate={setMutate} />
        ) : (
          <Box dangerouslySetInnerHTML={{ __html: value ?? t('Content') }} />
        )}
      </div>
    </Flex>
  );
};

export default WithLabel;
