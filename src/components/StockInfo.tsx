'use client';

import { useEffect, useState } from 'react';
import StockChart from './StockChart';

type StockResult = {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
};

type AllData = {
    name: string;
    symbol: string;
    price: number;
    change: number;
    percentChange: number;
    marketCap: number;
    exchange: string;
    open: number;
};

export default function StockInfo() {
    const [stocks, setStocks] = useState<StockResult[]>([]);
    const [stockData, setStockData] = useState<AllData>({
        name: 'N/A',
        symbol: '---',
        price: 0,
        change: 0,
        percentChange: 0,
        marketCap: 0,
        exchange: '---',
        open: 0
    });

    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [symbol, setSymbol] = useState('');
    const [searchError, setSearchError] = useState('');

    useEffect(() => {
        const controller = new AbortController(); // to cancel previous requests
        const delay = 500; // ms debounce delay

        if (!inputValue.trim()) {
            setStocks([]);
            setShowDropdown(false);
            return;
        }

        if (inputValue.includes(' ')) return;

        const debounceTimeout = setTimeout(() => {
            async function fetchSymbols() {
                try {
                    const res = await fetch(
                        `https://finnhub.io/api/v1/search?q=${inputValue}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`,
                        { signal: controller.signal }
                    );

                    const data = await res.json();

                    if (data.error) {
                        console.warn('API error:', data.error);
                        setStocks([]);
                        setShowDropdown(false);
                        return;
                    }

                    const filteredResults = data.result?.filter(
                        (item: any) =>
                            item.symbol &&
                            item.symbol.match(/^[A-Z.]+$/) &&
                            !item.symbol.endsWith('.CN')
                    );

                    setStocks(filteredResults || []);
                    setShowDropdown(true);
                } catch (err: any) {
                    if (err.name !== 'AbortError') {
                        console.error('Failed to fetch symbols:', err);
                    }
                    setStocks([]);
                    setShowDropdown(false);
                }
            }

            fetchSymbols();
        }, delay);

        return () => {
            clearTimeout(debounceTimeout);     // Cancel timeout on input change
            controller.abort();                // Cancel fetch if still running
        };
    }, [inputValue]);


    const fetchStockDetails = async (symbol: string, label: string) => {
        setInputValue(label);
        setSymbol(symbol);
        setShowDropdown(false);

        const [quoteRes, profileRes] = await Promise.all([
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`),
            fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`)
        ]);

        const quote = await quoteRes.json();
        const profile = await profileRes.json();
        if (quote.error || profile.error || !profile.name) {
            setSearchError('Data for this symbol is not available via our provider. Please try a different symbol.')
            return;
        } else {
            setSearchError('');
        }
        setStockData({
            name: profile.name,
            symbol: profile.ticker,
            price: quote.c,
            change: quote.d,
            percentChange: quote.dp,
            marketCap: profile.marketCapitalization,
            exchange: profile.exchange,
            open: quote.o
        });
    };

    const formatMarketCap = (value: number): string => {
        if (value >= 1_000) return (value / 1_000).toFixed(1) + 'T';
        if (value >= 1) return value.toFixed(1) + 'B';
        return value.toFixed(2);
    };

    return (
        <div className="bg-zinc-900 p-6 rounded-lg text-yellow-300 border border-zinc-700 space-y-4 shadow-md">
            <label htmlFor="stock" className="block text-sm font-medium">
                Search a stock
            </label>

            <input
                id="stock"
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                }}
                className="w-full bg-zinc-800 border border-zinc-600 text-yellow-300 px-4 py-2 rounded-md placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="AAPL, TSLA, etc..."
            />

            {showDropdown && stocks.length > 0 && (
                <div className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto bg-zinc-800 border border-zinc-600 rounded-md shadow">
                    {stocks.map((stock, i) => (
                        <div
                            key={i}
                            onClick={() => fetchStockDetails(stock.symbol, `${stock.description} (${stock.symbol})`)}
                            className="px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
                        >
                            {stock.description} ({stock.symbol})
                        </div>
                    ))}
                </div>
            )}
            {searchError && (
                <p className="text-red-400 text-sm mt-1">{searchError}</p>
            )}
            {stockData && (
                <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-md text-yellow-300">
                    <div className="text-xl font-semibold">
                        {stockData.name} ({stockData.symbol})
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-2 gap-4">
                        <div>
                            <div className="text-lg">${stockData.price.toFixed(2)}</div>
                            <div className={stockData.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {stockData.change >= 0 ? '▲' : '▼'} {stockData.change.toFixed(2)} ({stockData.percentChange.toFixed(2)}%)
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {stockData.marketCap && (
                                <div>
                                    <span className="font-medium">Market Cap:</span> {formatMarketCap(stockData.marketCap)}
                                </div>
                            )}
                            <div>
                                <span className="font-medium">Exchange:</span> {stockData.exchange}
                            </div>
                            <div>
                                <span className="font-medium">Open:</span> ${stockData.open.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <StockChart symbol={symbol} />
        </div>
    );
}
