// components/NewsCardSmall.tsx
import Image from 'next/image';
import Link from 'next/link';

type NewsItem = {
  category: string;
  datetime: number;
  headline: string;
  image: string;
  source: string;
  summary: string;
  url: string;
};

function formatTimeAgo(timestamp: number) {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

function estimateReadTime(summary: string) {
  const words = summary.split(' ').length;
  return `${Math.ceil(words / 200)} min read`;
}

export default function NewsCardSmall({ news }: { news: NewsItem }) {
  return (
    <Link href={news.url} target="_blank" rel="noopener noreferrer">
      <div className="flex gap-4 text-white hover:bg-zinc-800 p-2 rounded-md transition">
        <div className="w-20 h-20 relative flex-shrink-0">
          <Image src={news.image} alt="thumbnail" fill className="object-cover rounded-md" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-xs text-gray-400">{news.source} • {formatTimeAgo(news.datetime)}</div>
          <div className="font-medium text-sm">{news.headline}</div>
          <div className="text-xs text-yellow-400 uppercase">{news.category} • {estimateReadTime(news.summary)}</div>
        </div>
      </div>
    </Link>
  );
}
