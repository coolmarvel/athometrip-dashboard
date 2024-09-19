import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, ViewIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';

interface DataTableActionsProps {
  checked: boolean;
  onView: MouseEventHandler<HTMLButtonElement>;
  onUpdate: MouseEventHandler<HTMLButtonElement>;
}

const DataTableActions = ({ checked, onView, onUpdate }: DataTableActionsProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={'2'}>
      <Tooltip hasArrow label={t('View Details')}>
        <IconButton aria-label="view details" boxSize={5} icon={<ViewIcon />} onClick={onView} />
      </Tooltip>
      <Tooltip hasArrow label={t('Double Check')}>
        <IconButton aria-label="double check" boxSize={5} icon={<CheckIcon />} onClick={onUpdate} isDisabled={checked} />
      </Tooltip>
    </Flex>
  );
};

export default DataTableActions;