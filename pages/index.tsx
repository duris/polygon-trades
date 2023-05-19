import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, CandlestickData } from "lightweight-charts";

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

type AveragedTrade = {
  sip_timestamp: number;
  price: number;
};

type Trades = {
  results: Array<Trade>;
  request_id: string;
  next_url: string;
};

type TradeSet = {
  trades: Array<Trade>;
};

type Candle = {
  open: number;
  high: number;
  low: number;
  close: number;
};

type CandleData = {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const tradeSet = useRef<Array<Trade>>([]);
  const [chartApi, setChartApi] = useState<any>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candleRef = useRef<HTMLDivElement>(null);
  const [movingCandle, setMovingCandle] = useState<Candle>({
    open: 172.87,
    high: 172.69,
    low: 171.66,
    close: 172.26,
  });
  const [candles, setCandles] = useState<Array<CandleData>>();

  useEffect(() => {
    const getAggregateBars = async () => {
      const response = await fetch("/api/bars");
      const data = await response.json();

      setCandles(data.results);
    };

    getAggregateBars();
  }, []);

  // Initialize the chart
  useEffect(() => {
    if (chartContainerRef.current && !chartInstance && candles) {
      // Clear the chart container before rendering a new chart
      chartContainerRef.current.innerHTML = "";

      const chartOptions = {
        layout: {
          textColor: "black",
          background: {
            type: ColorType.Solid,
            color: "white",
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
          },
        },
      };
      const chart = createChart(chartContainerRef.current, chartOptions);

      const areaSeries = chart.addAreaSeries({
        lineColor: "#2962FF",
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
      });

      // areaSeries.setData([
      //   { time: "2023-05-07", value: 32.51 },
      //   { time: "2023-05-08", value: 31.11 },
      //   { time: "2023-05-09", value: 27.02 },
      //   { time: "2023-05-10", value: 27.32 },
      //   { time: "2023-05-11", value: 25.17 },
      //   { time: "2023-05-12", value: 28.89 },
      //   { time: "2023-05-13", value: 25.46 },
      //   { time: "2023-05-14", value: 23.92 },
      //   { time: "2023-05-15", value: 22.68 },
      //   { time: "2023-05-16", value: 22.67 },
      // ]);

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      let polygonCandles: CandlestickData[] = [];

      candles.forEach((candle) => {
        const date = new Date(candle.t);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if necessary
        var day = ("0" + date.getDate()).slice(-2); // Add leading zero if necessary

        // Combine the extracted values into the desired format
        var formattedDate = year + "-" + month + "-" + day;

        console.log({
          time: formattedDate,
          open: candle.o,
          high: candle.h,
          low: candle.l,
          close: candle.c,
        });

        console.log(formattedDate);
        polygonCandles.push({
          time: formattedDate,
          open: candle.o,
          high: candle.h,
          low: candle.l,
          close: candle.c,
        });
      });
      let oneMinuteData = [
        {
          time: "2023-05-16T09:30:00",
          open: 139.87,
          high: 154.69,
          low: 85.66,
          close: 111.26,
        },
        {
          time: "2023-05-16T09:31:00",
          open: 141.22,
          high: 156.21,
          low: 87.32,
          close: 112.78,
        },
        // more 1-minute data...
      ];

      candlestickSeries.setData(polygonCandles);
      // candlestickSeries.setData([
      //   {
      //     time: "2023-05-07",
      //     open: 75.16,
      //     high: 82.84,
      //     low: 36.16,
      //     close: 45.72,
      //   },
      //   {
      //     time: "2023-05-08",
      //     open: 45.12,
      //     high: 53.9,
      //     low: 45.12,
      //     close: 48.09,
      //   },
      //   {
      //     time: "2023-05-09",
      //     open: 60.71,
      //     high: 60.71,
      //     low: 53.39,
      //     close: 59.29,
      //   },
      //   {
      //     time: "2023-05-10",
      //     open: 68.26,
      //     high: 68.26,
      //     low: 59.04,
      //     close: 60.5,
      //   },
      //   {
      //     time: "2023-05-11",
      //     open: 67.71,
      //     high: 105.85,
      //     low: 66.67,
      //     close: 91.04,
      //   },
      //   {
      //     time: "2023-05-12",
      //     open: 91.04,
      //     high: 121.4,
      //     low: 82.7,
      //     close: 111.4,
      //   },
      //   {
      //     time: "2023-05-13",
      //     open: 111.51,
      //     high: 142.83,
      //     low: 103.34,
      //     close: 131.25,
      //   },
      //   {
      //     time: "2023-05-14",
      //     open: 131.33,
      //     high: 151.17,
      //     low: 77.68,
      //     close: 96.43,
      //   },
      //   {
      //     time: "2023-05-15",
      //     open: 106.33,
      //     high: 110.2,
      //     low: 90.39,
      //     close: 98.1,
      //   },
      //   {
      //     time: "2023-05-16",
      //     open: 139.87,
      //     high: 114.69,
      //     low: 85.66,
      //     close: 111.26,
      //   },
      // ]);

      chart.timeScale().fitContent();

      setChartInstance(chart);
      setChartApi({ chart, areaSeries, candlestickSeries });
    }
  }, [candles]);

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

  const processTrade = (trade: AveragedTrade) => {
    if (chartApi) {
      // Convert trade data to area and candlestick series format
      const time = "2023-05-16";

      const areaData = { time, value: trade.price };
      const candlestickData = {
        time,
        open: movingCandle.open,
        high: movingCandle.high,
        low: movingCandle.low,
        close: trade.price,
      };

      // console.log("Processing trade:", trade);
      // console.log("Trade timestamp:", trade.sip_timestamp);

      // console.log("Area data:", areaData);
      // console.log("Candlestick data:", candlestickData);

      // Update the area and candlestick series
      // chartApi.areaSeries.update(areaData);
      chartApi.candlestickSeries.update(candlestickData);
    }
  };

  const getAverageTradesPerMillisecond = (trades: Trade[]): AveragedTrade[] => {
    const tradeGroups: Record<number, { sum: number; count: number }> = {};

    trades.forEach((trade) => {
      const millisecondTimestamp = Math.floor(trade.sip_timestamp / 1000); // group by millisecond

      if (!tradeGroups[millisecondTimestamp]) {
        tradeGroups[millisecondTimestamp] = { sum: trade.price, count: 1 };
      } else {
        tradeGroups[millisecondTimestamp].sum += trade.price;
        tradeGroups[millisecondTimestamp].count += 1;
      }
    });

    const averagedTrades: AveragedTrade[] = Object.keys(tradeGroups).map(
      (timestamp) => {
        const { sum, count } = tradeGroups[parseInt(timestamp)];
        return { sip_timestamp: parseInt(timestamp), price: sum / count };
      }
    );

    return averagedTrades;
  };

  const getPolygonData = async () => {
    let trades = tradeSet.current;
    trades.sort((a, b) => a.sip_timestamp - b.sip_timestamp);
    while (trades.length < 100000) {
      console.log("Fetching more!!!");
      const data = await fetchTrades();

      if (data.results.length === 50000) {
        trades = trades.concat(data.results);
        tradeSet.current = trades;
      } else {
        break;
      }
    }

    // Apply the average trades per millisecond function here
    const averagedTrades = getAverageTradesPerMillisecond(trades);
    console.log("averaged trades count: ", averagedTrades.length);
    // Now use averagedTrades for the rest of your logic instead of trades
    const replayDelay = 1;
    averagedTrades.forEach((trade, index) => {
      if (index === 0) {
        console.log(trade);
        setMovingCandle({
          open: trade.price,
          high: 172.69,
          low: 171.66,
          close: 172.26,
        });
      }
      setTimeout(() => {
        processTrade(trade);
      }, index * replayDelay);
    });
  };

  // useEffect(() => {
  //   const openTime = new Date();
  //   openTime.setHours(9, 30, 0);
  //   openTime.setDate(15);

  //   console.log("Starting time: " + Date.parse(String(openTime)) * 1000000);
  // }, []);

  useEffect(() => {
    if (chartApi) {
      chartApi.candlestickSeries.update({
        time: "2023-05-16",
        open: movingCandle.open,
        high: movingCandle.high,
        low: movingCandle.low,
        close: movingCandle.close,
      });
    } else {
      ("no chart api yet");
    }
  }, [chartApi]);

  const increaseCandleHeight = () => {
    if (chartApi) {
      setMovingCandle({
        ...movingCandle,
        close: movingCandle.close + 1,
      });
      chartApi.candlestickSeries.update({
        time: "2023-05-16",
        open: movingCandle.open,
        high: movingCandle.high,
        low: movingCandle.low,
        close: movingCandle.close,
      });
    } else {
      ("no chart api yet");
    }
  };
  const decreaseCandleHeight = () => {
    if (chartApi) {
      setMovingCandle({
        ...movingCandle,
        close: movingCandle.close - 1,
      });
      chartApi.candlestickSeries.update({
        time: "2023-05-16",
        open: movingCandle.open,
        high: movingCandle.high,
        low: movingCandle.low,
        close: movingCandle.close,
      });
    } else {
      ("no chart api");
    }
  };

  return (
    <div>
      <button
        disabled={isLoading}
        onClick={() => getPolygonData()}
        className=" text-white bg-slate-700 p-2 m-2 rounded-lg hover:bg-slate-600"
      >
        Get Trade Results
      </button>

      <button
        onClick={() => increaseCandleHeight()}
        className=" px-4 py-2 bg-slate-700 m-2 rounded-full hover:bg-slate-600"
      >
        +
      </button>
      <button
        onClick={() => decreaseCandleHeight()}
        className=" px-4 py-2 bg-slate-700 mx-2 rounded-full hover:bg-slate-600"
      >
        -
      </button>

      <div
        className="chart-wrapper"
        ref={chartContainerRef}
        style={{ width: "600px", height: "300px" }}
      ></div>
    </div>
  );
}
