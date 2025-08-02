'use client';

import { useEffect, useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { Chapter } from '@/lib/content';
import '@/styles/noc-content.css';

interface ChapterContentProps {
  chapterId: string;
}

export function ChapterContent({ chapterId }: ChapterContentProps) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChapter = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/content/chapters/${chapterId}/content.json`);
        if (!response.ok) {
          throw new Error(`Chapter not found: ${chapterId}`);
        }
        const data = await response.json();
        setChapter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chapter content');
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [chapterId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Chapter not found'}</p>
      </div>
    );
  }

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      {/* Render the HTML content directly */}
      <div 
        dangerouslySetInnerHTML={{ __html: chapter.htmlContent }}
        className="noc-content"
      />
    </article>
  );
}