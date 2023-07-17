import { NextApiRequest, NextApiResponse } from "next";
import { GroupedDailyProps } from "../grouped-daily";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  const { ticker } = req.body;

  try {
    const stock = await prisma.stock.create({
      data: {
        ticker: ticker,
      },
    });

    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;
