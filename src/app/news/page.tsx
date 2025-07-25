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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/news?category=general&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
        );
        const data: NewsItem[] = await res.json();
        const filtered = data.filter(
          (item: NewsItem) =>
            item.image &&
            !item.image.startsWith('https://static2.finnhub.io/')
        );

        setNews(filtered);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const feature = news[0];
  const rest = news.slice(1);

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
