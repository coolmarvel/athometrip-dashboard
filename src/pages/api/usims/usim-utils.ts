import { RequiredKeysOf } from 'type-fest';

import { Order } from '@/apis';
import { getKeys, getValue } from '../redis';
import { handleStringKeyValue } from '@/types';

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

export const filterUsim = (usims: any[], after: string, before: string, region?: string, mode?: string) => {
  if (region && mode) {
    return usims.filter((usim: any) => {
      // 날짜 조건: order의 날짜가 after와 before 사이에 있어야 함
      const dateCondition = usim.order.date_created_gmt >= after && usim.order.date_created_gmt <= before;

      // 지역 조건: meta_data에서 사용 지역을 찾거나, product_id로 확인
      const regionCondition = (region: string, usim: any) => {
        const metaData = usim.line_items[0].meta_data;
        const productIdsForMexicoCanada = ['197555', '403418', '434516']; // 비교할 product_id 리스트

        if (region === 'usa') return handleStringKeyValue(metaData)['사용 지역 선택'] === '미국 내 사용';

        if (region === 'mexico/canada') {
          // '사용 지역 선택'이 없을 경우 product_id로 확인
          const regionValue = handleStringKeyValue(metaData)['사용 지역 선택'];
          if (regionValue) return regionValue === '미국 및 캐나다/멕시코';
          else {
            // '사용 지역 선택' 키가 없으면 product_id 확인
            const productId = usim.line_items[0].product_id;
            return productIdsForMexicoCanada.includes(productId);
          }
        }

        return false;
      };

      // 모드 조건: usim_info의 데이터에 따라 'usim' 또는 'esim'을 구분하여 필터링
      const modeCondition = (mode: string, usim: any) => {
        const usimInfo = usim.usim_info;
        if (!usimInfo) return false;

        if (mode === 'esim') return usimInfo.esim_eid && usimInfo.esim_imei;

        if (mode === 'usim') return !usimInfo.esim_eid && !usimInfo.esim_imei;

        return false;
      };

      // 모든 조건이 만족할 경우 true 반환
      return dateCondition && regionCondition(region, usim) && modeCondition(mode, usim);
    });
  } else {
    return usims.filter((usim: any) => {
      return usim.order.date_created_gmt >= after && usim.order.date_created_gmt <= before;
    });
  }
};
