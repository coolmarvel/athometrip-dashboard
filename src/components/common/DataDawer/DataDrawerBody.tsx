import { Dispatch, SetStateAction } from 'react';
import { Box, Divider, DrawerBody, Skeleton, Stack, StackDivider } from '@chakra-ui/react';

import { useSafePush } from '@/hooks';
import { OrderType } from '@/types';
import { WithLabel } from '@/components';
import { DataDrawerBodyTable } from './DataDrawerBodyTable';

type Attribute =
  | {
      label: string;
      value: string;
      isMemo?: undefined;
      isEdit?: undefined;
      id?: undefined;
      onEdit?: undefined;
    }
  | {
      label: string;
      isMemo: boolean;
      isEdit: boolean;
      id: string;
      onEdit: () => void;
      value: string;
    };

type Column = {
  name: string;
  quantity: string;
  total: string;
};

interface DataDrawerBodyProps {
  columns: Column[];
  data: OrderType;
  attributes: Attribute[];
  setMutate: (data?: any) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export const DataDrawerBody = ({ attributes, columns, data, setMutate, setIsOpen, setIsEdit }: DataDrawerBodyProps) => {
  const { router } = useSafePush();

  return (
    <>
      <DrawerBody>
        <Stack>
          <Box>
            <Stack divider={<StackDivider />} spacing={'3'}>
              {attributes.map((attribute, index) => (
                <Skeleton key={index} isLoaded={!!data}>
                  <WithLabel
                    id={attribute.id}
                    setIsOpen={setIsOpen}
                    setIsEdit={setIsEdit}
                    setMutate={setMutate}
                    label={attribute.label}
                    value={attribute.value}
                    isMemo={attribute.isMemo}
                    isEdit={attribute.isEdit}
                    onEdit={attribute.onEdit}
                    after={router.query['after'] as string}
                    before={router.query['before'] as string}
                  />
                </Skeleton>
              ))}
            </Stack>
          </Box>

          <Divider />

          <DataDrawerBodyTable columns={columns} />
        </Stack>
      </DrawerBody>
    </>
  );
};
