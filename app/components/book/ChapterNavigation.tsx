'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface Chapter {
  id: string;
  title: string;
  sections?: {
    id: string;
    title: string;
  }[];
}

// Mock chapters for now - will be loaded from content sync
const mockChapters: Chapter[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    sections: [
      { id: 'what-is-nature-of-code', title: 'What is Nature of Code?' },
      { id: 'what-is-processing', title: 'What is Processing?' },
    ],
  },
  {
    id: 'vectors',
    title: 'Chapter 1: Vectors',
    sections: [
      { id: 'what-is-a-vector', title: 'What is a Vector?' },
      { id: 'vector-math', title: 'Vector Math' },
      { id: 'vector-motion', title: 'Motion with Vectors' },
    ],
  },
  {
    id: 'forces',
    title: 'Chapter 2: Forces',
    sections: [
      { id: 'newtons-laws', title: "Newton's Laws" },
      { id: 'applying-forces', title: 'Applying Forces' },
      { id: 'friction', title: 'Friction' },
    ],
  },
];

export function ChapterNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-full text-left font-semibold text-lg flex items-center justify-between"
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
        
        <nav className={`mt-4 space-y-2 ${isOpen ? 'block' : 'hidden md:block'}`}>
          {mockChapters.map((chapter) => (
            <div key={chapter.id}>
              <Link
                href={`/chapters/${chapter.id}`}
                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                  pathname === `/chapters/${chapter.id}`
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {chapter.title}
              </Link>
              
              {chapter.sections && pathname.startsWith(`/chapters/${chapter.id}`) && (
                <div className="ml-4 mt-1 space-y-1">
                  {chapter.sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`/chapters/${chapter.id}#${section.id}`}
                      className="block px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                      {section.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}