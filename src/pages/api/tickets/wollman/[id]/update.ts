import { NextApiRequest, NextApiResponse } from 'next';
import { cloneDeep } from 'lodash-es';
import axios from 'axios';

import { getValue, setValue } from '@/pages/api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return updateWollman(req, res);
    default:
      return res.status(405).end();
  }
}

const ticketName = 'wollman';
const url = process.env.NEXT_PUBLIC_API_URL as string;

const updateWollman = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: orderItemId, double_check, after, before, memo } = req.body;

  const key = `${ticketName}_${after}_${before}`;

  try {
    await axios.put(`${url}?order_id=${orderItemId}&double_check=${double_check}&memo=${memo}`);

    let data: any = await getValue(key);
    data = cloneDeep(data).map((item: any) => {
      const updatedLineItems = item.line_items.map((lineItem: any) => {
        if (lineItem.order_item_id === Number(orderItemId)) {
          return {
            ...lineItem,
            double_checked: double_check !== undefined ? double_check : lineItem.double_checked,
            memo: memo !== undefined ? memo : lineItem.memo,
          };
        }
        return lineItem;
      });

      return { ...item, line_items: updatedLineItems };
    });

    await setValue(key, data);

    return res.status(200).send({ data: [], message: `Successfully update ${ticketName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to update ${ticketName}` });
  }
};
