import { RequiredKeysOf } from 'type-fest';

import { Order } from '@/apis';
import { getKeys, getValue } from '../redis';
import { handleStringKeyValue } from '@/types';

export const checkExistingDataInRange = async (name: string, after: string, before: string) => {
  const keys = await getKeys(`${name}_*`);
  for (const key of keys) {
    const [_, savedAfter, savedBefore] = key.split('_');
    if (new Date(savedAfter) <= new Date(after) && new Date(savedBefore) >= new Date(before)) return (await getValue(key)) as any[];
  }

  return null;
};

const sortMap: any = {
  id: 'id',
  order_id: 'id',
  email: 'meta_data._billing_email',
  order_date_created: 'date_created',
  name: 'meta_data._billing_first_name',
  billing_email: 'meta_data._billing_email',
  billing_name: 'meta_data._billing_first_name',
};

export const sortUsim = (usims: any, sort: RequiredKeysOf<any>, order: Order, search: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (search.length > 0) {
        usims = usims.filter((usim: any) => {
          const usimId = usim.id.toString();
          const email = usim.meta_data._billing_email.toLowerCase();
          const name = usim.meta_data._billing_first_name.toLowerCase();

          return usimId.includes(search.toLowerCase()) || email.includes(search.toLowerCase()) || name.includes(search.toLowerCase());
        });
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

export const filterUsim = async (usims: any[], after: string, before: string, region?: string, mode?: string) => {
  const afterDate = new Date(`${after}T00:00:00`);
  const beforeDate = new Date(`${before}T23:59:59`);

  if (region && mode) {
    return usims.filter((usim: any) => {
      const usimDate = new Date(usim.date_created);
      const dateCondition = usimDate >= afterDate && usimDate <= beforeDate;

      // 지역 조건: meta_data에서 사용 지역을 찾거나, product_id로 확인
      const regionCondition = (region: string, usim: any) => {
        const productIdsForMexicoCanada = ['197555', '403418', '434516']; // 비교할 product_id 리스트

        return usim.line_items.some((lineItem: any) => {
          const metaData = lineItem.meta_data;
          const proudctId = lineItem._product_id;

          if (region === 'usa') return handleStringKeyValue(metaData)['사용 지역 선택'] === '미국 내 사용';

          if (region === 'mexico/canada') {
            const regionValue = handleStringKeyValue(metaData)['사용 지역 선택'] || handleStringKeyValue(metaData)['사용 지역 선택 ($3)'];
            if (regionValue) return regionValue === '미국 및 캐나다/멕시코';
            else return productIdsForMexicoCanada.includes(proudctId);
          }
        });
      };

      // 모드 조건: usim_info의 데이터에 따라 'usim' 또는 'esim'을 구분하여 필터링
      const modeCondition = (mode: string, usim: any) => {
        const metaData = usim.meta_data;

        if (!metaData) return false;
        if (mode === 'esim') return metaData.esim_eid && metaData.esim_imei;
        if (mode === 'usim') return !metaData.esim_eid && !metaData.esim_imei;

        return false;
      };

      // 모든 조건이 만족할 경우 true 반환
      return dateCondition && regionCondition(region, usim) && modeCondition(mode, usim);
    });
  } else {
    return usims.filter((usim: any) => {
      const usimDate = new Date(usim.date_created);

      return usimDate >= afterDate && usimDate <= beforeDate;
    });
  }
};
