import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return res.status(200).end();

    case 'POST':
      return res.status(200).end();

    default:
      return res.status(200).end();
  }
}

const getTopOfTheRock = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
  } catch (error) {}
};

const getTopOfTheRockByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
  } catch (error) {}
};
