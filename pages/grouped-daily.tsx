import { useEffect, useState } from "react";

export type GroupedDailyProps = {
  T: string;
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
};

const GroupedDaily = () => {
  const [date, setDate] = useState<String>();
  const [dailyData, setDailyData] = useState<Array<GroupedDailyProps>>();

  const getGroupedDailyData = async () => {
    console.log(date);
    const response = await fetch("/api/grouped-daily", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
      }),
    });
    const data = await response.json();

    setDailyData(data.results);
  };

  const saveToDatabase = async (ticker: string) => {
    const response = await fetch("/api/save-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticker: ticker,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    if (dailyData) {
      dailyData.forEach((data) => {
        saveToDatabase(data.T);
      });
    }
  }, [dailyData]);

  return (
    <div className="m-2">
      <h1>Grouped Daily</h1>
      <div>
        <button onClick={getGroupedDailyData} className=" p-2 bg-slate-600">
          Download data
        </button>
      </div>
      <input
        type="date"
        className=" text-black"
        onChange={(e) => setDate(e.target.value)}
      />
      <div>
        {dailyData
          ? dailyData
              .filter((data, index) => index < 500)
              .map((data, index) => {
                return (
                  <div key={data.T}>
                    <div>
                      {data.T}{" "}
                      <span className=" bg-white text-green-800">{data.c}</span>
                    </div>
                  </div>
                );
              })
          : "Loading..."}
      </div>
    </div>
  );
};

export default GroupedDaily;
