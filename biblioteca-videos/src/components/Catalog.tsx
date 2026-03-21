import React, { useRef } from 'react';
import type { Video } from '../types/video';
import { VideoCard } from './VideoCard';

interface CatalogProps {
  title: string;
  videos: Video[];
}

export const Catalog: React.FC<CatalogProps> = ({ title, videos }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (videos.length === 0) return null;

  return (
    <div className="mb-12 relative group/section">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-4 md:px-12 flex items-center">
        {title} 
        <span className="opacity-0 group-hover/section:opacity-100 text-netflixRed text-sm ml-4 transition-opacity cursor-pointer flex items-center">
            Explorar <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </span>
      </h2>
      
      <div className="relative group/row">
        {/* Left Scroll Button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 w-12 bg-black bg-opacity-50 text-white z-20 
                     opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center
                     hover:bg-opacity-70 hover:w-14"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Video Reel */}
        <div 
          ref={scrollRef}
          className="flex space-x-2 md:space-x-4 overflow-x-auto py-4 px-4 md:px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 w-12 bg-black bg-opacity-50 text-white z-20 
                     opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center
                     hover:bg-opacity-70 hover:w-14"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
