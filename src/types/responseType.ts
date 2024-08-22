export type ResponseType = {
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
}

export type StringKeyValue = {
  [key: string]: string;
}

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
}

export function handleStringKeyValue(input: string | StringKeyValue): StringKeyValue {
  if (typeof input === 'string') return { defaultKey: input };

  return input;
}