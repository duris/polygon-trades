import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      `https://api.polygon.io/v3/trades/AAPL?apiKey=${process.env.POLYGON_API_KEY}`,
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
