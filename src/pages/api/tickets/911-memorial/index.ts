import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      console.log(req.query);
      const { page, cursor, limit } = req.query;
      if (page && limit) return get911MemorialsByPage(req, res);
      return get911Memorials(req, res);
    case 'POST':
      //   return createUser(req, res);
      return res.status(405).end();
    default:
      return res.status(405).end();
  }
}

// [GET] http://localhost:3000/api/production/adapter/1/11
const get911Memorials = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await axios.get('http://localhost:3000/api/production/adapter/types/1/11?page=1&size=1');

    return res.status(200).json({ data: result.data, message: 'Successfully retrieved users' });
  } catch {
    return res.status(500).json({ data: null, message: 'Failed to get users' });
  }
};

// [GET] http://localhost:3000/api/production/adapter/1/11
const get911MemorialsByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await axios.get('http://localhost:3000/api/production/adapter/types/1/11?page=1&size=1');

    console.log(result);

    return res.status(200).json({ data: { total: result.data.length, data: result.data }, message: 'Successfully retrieved users' });
  } catch {
    return res.status(500).json({ data: null, message: 'Failed to get users' });
  }
};
