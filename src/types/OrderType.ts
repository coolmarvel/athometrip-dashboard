export type OrderType = {
  id?: number;
  order: Order;
  line_items: StringKeyValue[];
  payment?: StringKeyValue;
  billing?: StringKeyValue;
  shipping?: StringKeyValue;
  guest_house?: StringKeyValue;
  jfk_oneway?: StringKeyValue;
  jfk_shuttle_rt?: StringKeyValue;
  h2o_usim?: StringKeyValue;
  usim_info?: StringKeyValue;
  tour?: StringKeyValue;
  tour_info?: StringKeyValue;
  snap_info?: StringKeyValue;
};

export type StringKeyValue = {
  [key: string]: string;
};

export type Order = {
  id: string;
  status: string;
  currency: string;
  currency_symbol: string;
  date_created: Date;
  date_created_gmt: Date;
  date_completed: Date;
  date_completed_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  meta_data: StringKeyValue;
  double_checked?: boolean;
  memo: string;
};

export function handleStringKeyValue(input: string | StringKeyValue): StringKeyValue {
  if (typeof input === 'string') return { defaultKey: input };

  // input이 객체일 때, URL 인코딩된 키들을 디코딩해서 새로운 객체로 반환
  const decodedObject: StringKeyValue = {};
  for (const [key, value] of Object.entries(input)) {
    const decodedKey = decodeURIComponent(key);
    decodedObject[decodedKey] = value;
  }

  return decodedObject;
}
