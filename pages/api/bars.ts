import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-01/2023-05-16?adjusted=true&sort=asc&limit=120&apiKey=${process.env.POLYGON_API_KEY}`,
      {
        method: "get",
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;

export const config = {
  api: {
    responseLimit: false,
  },
};
