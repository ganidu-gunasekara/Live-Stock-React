'use client';

import { useEffect, useState } from 'react';
import NewsCardSmall from '@/components/NewsCardSmall';
import NewsCardFeature from '@/components/NewsCardFeature';

type NewsItem = {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchNews() {
      const res = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
      );
      const data = await res.json();
      setNews(data);
    }

    fetchNews();
  }, []);

  const feature = news[1];
  const rest = news.slice(0);

  return (
    <div className="p-6 bg-black min-h-screen text-white space-y-6">
      {feature && <NewsCardFeature news={feature} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((item) => (
          <NewsCardSmall key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}

