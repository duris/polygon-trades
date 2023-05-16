import { useEffect, useState } from "react";

type Results = {
  results: Array<object>;
};

export default function Home() {
  const [trades, setTrades] = useState<Results>();

  useEffect(() => {
    const getPolygonData = async () => {
      const response = await fetch("/api/trades", {
        method: "get",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({

        // })
      });
      const data = await response.json();

      setTrades(data);
    };

    getPolygonData();
  }, []);

  return (
    <div>
      <h1>Trades</h1>
      <p>{trades ? JSON.stringify(trades) : "Loading..."}</p>
    </div>
  );
}
