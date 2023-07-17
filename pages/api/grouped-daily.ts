import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  const { date } = req.body;

  console.log(date);

  try {
    const response = await fetch(
      `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`,
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
