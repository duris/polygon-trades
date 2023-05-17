import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const apiUrl = url + `&apiKey=${process.env.POLYGON_API_KEY}`;
  try {
    const response = await fetch(apiUrl, {
      method: "get",
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;
