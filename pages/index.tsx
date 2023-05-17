import { useEffect, useState } from "react";

type Trade = {
  exchange: number;
  id: string;
  participant_timestamp: Date;
  price: number;
  sequence_number: number;
  sip_timestamp: number;
  size: number;
  tape: number;
};

type Trades = {
  results: Array<Trade>;
  request_id: string;
  next_url: string;
};

type TradeSet = {
  trades: Array<Trade>;
};

export default function Home() {
  const [polygonData, setPolygonData] = useState<Trades>();
  const [tradeSet, setTradeSet] = useState<Array<Trade>>([]);

  const fetchTrades = async () => {
    const response = await fetch("/api/trades", {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  const getPolygonData = async () => {
    let trades = tradeSet;
    while (trades.length < 200) {
      const data = await fetchTrades();

      if (data.results.length === 50) {
        trades = trades.concat(data.results);
        setTradeSet(trades);
      } else {
        break;
      }
    }
    console.log(trades.length);
  };

  useEffect(() => {
    const openTime = new Date();
    openTime.setHours(9, 30, 0);
    openTime.setDate(15);

    console.log("Starting time: " + Date.parse(String(openTime)) * 1000000);
  }, []);

  return (
    <div>
      <h1>Trades</h1>
      <button
        onClick={getPolygonData}
        className=" text-white bg-slate-700 p-2 m-2 rounded-lg"
      >
        Get Trade Results
      </button>

      {/* Render the trades */}
      <ul>
        {tradeSet.map((trade, index) => (
          <li key={index}>
            {trade.id}: {trade.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
