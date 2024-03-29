import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { ticker, date, limit } = req.body;

  try {
    const response = await fetch(
      `https://api.polygon.io/v3/trades/AAPL?timestamp.gt=1684243800000000000&order=asc&limit=50000&apiKey=${process.env.POLYGON_API_KEY}`,
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
