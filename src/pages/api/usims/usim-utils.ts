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

const splitEsimData = (usims: any[]) => {
  return usims.flatMap((usim: any) => {
    const esimKeys = Object.keys(usim.usimInfo).filter((key) => key.startsWith('esim_') && usim.usimInfo[key] && (usim.usimInfo[key].includes(',') || usim.usimInfo[key].includes('/')));
    if (esimKeys.length === 0) return [usim];

    const maxSplits = Math.max(...esimKeys.map((key) => usim.usimInfo[key].split(/[,/]/).length));

    return Array.from({ length: maxSplits }, (_, index) => {
      const newUsim = { ...usim, usimInfo: { ...usim.usimInfo } };
      esimKeys.forEach((key) => {
        const values = usim.usimInfo[key].split(/[,/]/);
        newUsim.usimInfo[key] = values[index] ?? values[0];
      });
      return newUsim;
    });
  });
};

export const sortUsim = (usims: any, sort: RequiredKeysOf<any>, order: Order): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (sort && order) {
        usims = splitEsimData(usims);
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

export const filterUsim = (usims: any, after: string, before: string, mode: string) => {
  const start = new Date(after);
  const end = new Date(before);

  return usims.filter((usim: any) => {
    const usimDate = new Date(usim.order.date_created);
    const dateCondition = usimDate >= start && usimDate <= end;

    if (mode === 'usim') return dateCondition && usim.usimInfo.esim_eid == null && usim.usimInfo.esim_imei == null;
    else if (mode === 'esim') return dateCondition && typeof usim.usimInfo.esim_eid === 'string' && typeof usim.usimInfo.esim_imei === 'string';

    return false;
  });
};
