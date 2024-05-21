import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return get911Memorial(req, res);
    default:
      return res.status(405).end();
  }
}

const get911Memorial = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
  } catch (error) {
    return res.status(500).json({ data: null, message: `Failed to get 911-memorial ${id}` });
  }
};
