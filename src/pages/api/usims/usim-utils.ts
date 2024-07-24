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

const sortMap: any = {
  id: 'order.id',
  order_id: 'order.id',
  email: 'billing.email',
  billing_email: 'billing.email',
  name: 'billing.first_name',
  billing_name: 'billing.first_name',
  order_date_created_gmt: 'order.date_created_gmt',
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
      const metaData = usim.line_items[0]?.meta_data;
      if (!metaData) return false;

      if (region === 'usa') return Object.values(metaData).includes('미국 내 사용');
      else if (region === 'mexico/canada') return Object.values(metaData).includes('미국 및 캐나다/멕시코');

      return false;
    };

    const modeCondition = (mode: string, usim: any) => {
      const usimInfo = usim.usim_info;
      if (mode === 'usim') return !usimInfo?.esim_eid && !usimInfo?.esim_imei;
      else if (mode === 'esim') return typeof usimInfo?.esim_eid === 'string' && typeof usimInfo?.esim_imei === 'string';

      return false;
    };

    return dateCondition && regionCondition(region, usim) && modeCondition(mode, usim);
  });
};
