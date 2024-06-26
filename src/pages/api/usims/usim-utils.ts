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

// const splitEsimData = (usims: any[]) => {
//   return usims.flatMap((usim: any) => {
//     const esimKeys = Object.keys(usim.usimInfo).filter((key) => key.startsWith('esim_') && usim.usimInfo[key] && (usim.usimInfo[key].includes(',') || usim.usimInfo[key].includes('/')));
//     if (esimKeys.length === 0) return [usim];
//
//     const maxSplits = Math.max(...esimKeys.map((key) => usim.usimInfo[key].split(/[,/]/).length));
//
//     return Array.from({ length: maxSplits }, (_, index) => {
//       const newUsim = { ...usim, usimInfo: { ...usim.usimInfo } };
//       esimKeys.forEach((key) => {
//         const values = usim.usimInfo[key].split(/[,/]/);
//         newUsim.usimInfo[key] = values[index] ?? values[0];
//       });
//       return newUsim;
//     });
//   });
// };

const sortMap: any = {
  id: 'order.id',
  order_id: 'order.id',
  email: 'billing.email',
  billing_email: 'billing.email',
  name: 'billing.first_name',
  billing_name: 'billing.first_name',
  order_date_created: 'order.date_created',
};

export const sortUsim = (usims: any, sort: RequiredKeysOf<any>, order: Order, search: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (search.length > 0) {
        usims = usims.filter(
          (usim: any) =>
            usim.order.id.includes(search.toLowerCase()) ||
            usim.billing.email.toLowerCase().includes(search.toLowerCase()) ||
            usim.billing.first_name.toLowerCase().includes(search.toLocaleLowerCase()),
        );
      }

      if (sort && order) {
        const resolvedSortPath = sortMap[sort] || sort;
        const deepValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

        usims.sort((a: any, b: any) => {
          const valueA = deepValue(a, resolvedSortPath);
          const valueB = deepValue(b, resolvedSortPath);

          if (typeof valueA === 'string' && typeof valueB === 'string') return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          if (valueA > valueB) return order === 'asc' ? 1 : -1;
          if (valueA < valueB) return order === 'asc' ? -1 : 1;

          return 0;
        });
      }

      return resolve(usims);
    } catch (error) {
      return reject(error);
    }
  });
};

export const filterUsim = (usims: any, after: string, before: string, region: string, mode: string) => {
  const start = new Date(after);
  const end = new Date(before);

  return usims.filter((usim: any) => {
    const usimDate = new Date(usim.order.date_created);
    const dateCondition = usimDate >= start && usimDate <= end;

    const regionCondition = (region: string, usim: any) => {
      if (region === 'usa')
        return usim.lineItem.metadata.some((meta: any) => meta.key === '사용 지역 선택' && meta.value === '미국 내 사용');
      else if (region === 'mexico/canada')
        return usim.lineItem.metadata.some((meta: any) => meta.key === '사용 지역 선택 ($3)' && meta.value === '미국 및 캐나다/멕시코');

      return false;
    };

    const modeCondition = (mode: string, usim: any) => {
      if (mode === 'usim') return usim.usimInfo.esim_eid == null && usim.usimInfo.esim_imei == null;
      else if (mode === 'esim') return typeof usim.usimInfo.esim_eid === 'string' && typeof usim.usimInfo.esim_imei === 'string';

      return false;
    };

    return dateCondition && regionCondition(region, usim) && modeCondition(mode, usim);
  });
};
