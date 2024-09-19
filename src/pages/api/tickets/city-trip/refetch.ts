import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return refetchCityTrip(req, res);
    default:
      return res.status(405).end();
  }
}

const ticketName = 'city-trip';
const url = process.env.NEXT_PUBLIC_APIS_URL;

const refetchCityTrip = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).send({ data: [], message: `Successfully refetch ${ticketName}` });
  } catch {
    return res.status(500).send({ data: null, message: `Failed to refetch ${ticketName}` });
  }
};
