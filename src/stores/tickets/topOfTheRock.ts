import { Order } from '@/apis';
import axios from 'axios';
import { RequiredKeysOf } from 'type-fest';
import { create } from 'zustand';
import { useShallow } from '@/hooks';

interface T {
  data: any[];

  clearData: () => void;
  fetchData: () => Promise<void>;
  sortData: (storeData?: any, sort?: RequiredKeysOf<any>, order?: Order) => Promise<any>;
}

export const topOfTheRockStore = create<T>((set) => ({
  data: [],

  clearData: () => set({ data: [] }),
  fetchData: async () => {
    const result = await axios.get('http://localhost:3000/api/production/adapter/types/2/108');
    set({ data: result.data });
  },

  sortData: async (storeData, sort, order) => {
    if (sort && order) {
      storeData = storeData.map((item: any) => ({ ...item, id: parseInt(item.order.id, 10) }));
      storeData = storeData.sort((a: any, b: any) => {
        const ac = a[sort];
        const bc = b[sort];

        if (ac > bc) return order === 'desc' ? -1 : 1;
        else if (ac < bc) return order === 'desc' ? 1 : -1;
        else return 0;
      });
    }

    return storeData;
  },
}));

export const useTopOfTheRockStore = <K extends keyof T>(keys: K[]) => {
  return useShallow(topOfTheRockStore, keys);
};
