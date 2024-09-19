import { NextApiRequest, NextApiResponse } from 'next';
import { cloneDeep } from 'lodash-es';
import axios from 'axios';

import { getValue, setValue } from '@/pages/api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return updateTopOfTheRock(req, res);
    default:
      return res.status(405).end();
  }
}

const ticketName = 'top-of-the-rock';
const url = process.env.NEXT_PUBLIC_API_URL as string;

const updateTopOfTheRock = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, double_check, after, before, memo } = req.body;

  const key = `${ticketName}_${after}_${before}`;

  try {
    await axios.put(`${url}?order_id=${id}&double_check=${double_check}&memo=${memo}`);

    let data: any = await getValue(key);

    if (double_check !== undefined) {
      data = cloneDeep(data).map((item: any) => {
        if (item.id === Number(id)) return { ...item, order: { ...item.order, double_checked: double_check } };

        return item;
      });

      await setValue(key, data);
    }

    if (memo !== undefined) {
      let data: any = await getValue(key);
      data = cloneDeep(data).map((item: any) => {
        if (item.id === Number(id)) return { ...item, order: { ...item.order, memo: memo } };

        return item;
      });

      await setValue(key, data);
    }

    return res.status(200).send({ data: [], message: `Successfully update ${ticketName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to update ${ticketName}` });
  }
};
