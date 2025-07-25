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

export default function NewsCardFeature({ news }: { news: NewsItem }) {
  return (
    <Link href={news.url} target="_blank" rel="noopener noreferrer">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image
          src={news.image}
          alt={news.headline}
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Only covers bottom 40% */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="text-sm text-gray-300 mb-2">
            {news.source} • {formatTimeAgo(news.datetime)}
          </div>
          <h2 className="text-2xl font-bold leading-snug text-white">
            {news.headline}
          </h2>
          <div className="text-xs text-yellow-400 mt-2 uppercase">
            {news.category} • {estimateReadTime(news.summary)}
          </div>
        </div>
      </div>
    </Link>
  );
}
