'use client';

import { useEffect, useState } from 'react';
import ReactApexChart from './ReactApexChart';

type SymbolProp = {
  symbol: string;
};

export default function StockChart({ symbol }: SymbolProp) {
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchChartData() {
      if (!symbol) {
        setSeries([]); // ensure chart clears if no symbol
        return;
      }

      setLoading(true);
      setError('');

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const fourYearsAgo = new Date(yesterday);
      fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);

      const to = yesterday.toISOString().split('T')[0];
      const from = fourYearsAgo.toISOString().split('T')[0];

      try {
        const res = await fetch(
          `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`
        );
        const json = await res.json();

        if (json.status === 'OK' && json.results?.length > 0) {
          const chartData = json.results.map((d: any) => ({
            x: new Date(d.t),
            y: [d.o, d.h, d.l, d.c],
          }));
          setSeries([{ data: chartData }]);
        } else {
          setSeries([{ data: [] }]); // empty chart data
        }
      } catch (e) {
        setError('API error');
        setSeries([{ data: [] }]); // fallback
      }

      setLoading(false);
    }

    fetchChartData();
  }, [symbol]);

  return (
  <div className="bg-zinc-900 p-6 rounded-lg text-yellow-300 border border-zinc-700 shadow-md mt-8">
    <h2 className="text-2xl font-bold mb-4">
      {symbol ? `${symbol} Stock Chart` : 'Stock Chart'}
    </h2>

    {loading ? (
      <div className="flex items-center justify-center h-[350px]">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : error ? (
      <p className="text-red-400">{error}</p>
    ) : (
      <ReactApexChart
        type="candlestick"
        series={series}
        options={{
          chart: {
            type: 'candlestick',
            height: 350,
            background: '#18181b',
            toolbar: { show: false },
          },
          xaxis: {
            type: 'datetime',
            labels: {
              style: {
                colors: '#facc15', // yellow-400
              },
            },
          },
          yaxis: {
            tooltip: { enabled: true },
            labels: {
              style: {
                colors: '#facc15',
              },
            },
          },
          noData: {
            text: 'Please search a stock',
            align: 'center',
            verticalAlign: 'middle',
            style: {
              color: '#facc15',
              fontSize: '16px',
            },
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#22c55e',
                downward: '#ef4444',
              },
            },
          },
        }}
        height={350}
      />
    )}
  </div>
)}
