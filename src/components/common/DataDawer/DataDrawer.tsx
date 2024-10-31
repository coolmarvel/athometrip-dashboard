import { Dispatch, SetStateAction, useState } from 'react';
import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';

import { OrderType } from '@/types';
import { DataDrawerBody } from './DataDrawerBody';
import { DataDrawerHeader } from './DataDrawerHeader';

type Attribute = (
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
    }
)[];

type Column = {
  name: string;
  quantity: string;
  total: string;
}[];

interface DataDrawerProps {
  columns: Column;
  data: OrderType;
  attributes: Attribute;
  onClose: () => void;
  setMutate: (data?: any) => void;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const DataDrawer = ({ attributes, columns, data, setMutate, setIsEdit, onClose }: DataDrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} size={'lg'} placement={'right'}>
        <DrawerOverlay />

        <DrawerContent>
          <DataDrawerHeader data={data} />

          <DataDrawerBody attributes={attributes} columns={columns} data={data} setMutate={setMutate} setIsOpen={setIsOpen} setIsEdit={setIsEdit} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DataDrawer;
