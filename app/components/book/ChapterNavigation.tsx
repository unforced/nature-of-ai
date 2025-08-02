'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChapterIndex } from '@/lib/content';

export function ChapterNavigation() {
  const [chapters, setChapters] = useState<ChapterIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapters() {
      try {
        const response = await fetch('/content/index.json');
        const data = await response.json();
        setChapters(data.chapters);
      } catch (error) {
        console.error('Failed to load chapters:', error);
      } finally {
        setLoading(false);
      }
    }
    loadChapters();
  }, []);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left font-semibold text-lg flex items-center justify-between"
          >
            Chapters
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <nav className={`mt-4 space-y-2 ${isOpen ? 'block' : 'hidden'} md:block`}>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto"></div>
            </div>
          ) : (
            <>
              {/* Pages section */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Getting Started</h3>
                {chapters.filter(ch => ch.type === 'page' && ['dedication', 'acknowledgements', 'introduction'].includes(ch.id)).map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/chapters/${chapter.id}`}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      pathname === `/chapters/${chapter.id}`
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {chapter.title}
                  </Link>
                ))}
              </div>
              
              {/* Chapters section */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Chapters</h3>
                {chapters.filter(ch => ch.type === 'chapter').map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/chapters/${chapter.id}`}
                    className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                      pathname === `/chapters/${chapter.id}`
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {chapter.title}
                  </Link>
                ))}
              </div>
              
              {/* Appendices section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Appendices</h3>
                {chapters.filter(ch => ch.type === 'page' && !['dedication', 'acknowledgements', 'introduction'].includes(ch.id)).map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/chapters/${chapter.id}`}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      pathname === `/chapters/${chapter.id}`
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {chapter.title}
                  </Link>
                ))}
              </div>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
}