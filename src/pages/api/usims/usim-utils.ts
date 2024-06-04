import { Order } from '@/apis';
import { RequiredKeysOf } from 'type-fest';
import { getKeys, getValue } from '../redis';

export const checkExistingDataInRange = async (name: string, after: string, before: string) => {
  const keys = await getKeys(`${name}_*`);
  for (const key of keys) {
    const [_, savedAfter, savedBefore] = key.split('_');
    if (new Date(savedAfter) <= new Date(after) && new Date(savedBefore) >= new Date(before)) return await getValue(key);
  }

  return null;
};

export const sortUsim = (usims: any, sort: RequiredKeysOf<any>, order: Order): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (sort && order) {
        usims = usims.map((usim: any) => ({ ...usim, id: parseInt(usim.order.id, 10) }));
        usims = usims.sort((a: any, b: any) => {
          const ac = a[sort];
          const bc = b[sort];

          if (ac > bc) return order === 'desc' ? -1 : 1;
          else if (ac < bc) return order === 'desc' ? 1 : -1;
          else return 0;
        });
      }

      return resolve(usims);
    } catch (error) {
      return reject(error);
    }
  });
};

export const filterUsim = (usims: any, after: string, before: string) => {
  const start = new Date(after);
  const end = new Date(before);

  return usims.filter((usim: any) => {
    const usimDate = new Date(usim.order.date_created);

    return usimDate >= start && usimDate <= end;
  });
};
