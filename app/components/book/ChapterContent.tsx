'use client';

import { useEffect, useState } from 'react';
import { CodeBlock } from './CodeBlock';

interface ChapterData {
  id: string;
  title: string;
  content: string;
  codeBlocks: Array<{
    id: string;
    language: string;
    code: string;
    caption?: string;
  }>;
}

interface ChapterContentProps {
  chapterId: string;
}

export function ChapterContent({ chapterId }: ChapterContentProps) {
  const [chapter, setChapter] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In production, this would load from processed content
    // For now, we'll use mock data
    const loadChapter = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock chapter data
        const mockChapter: ChapterData = {
          id: chapterId,
          title: chapterId === 'introduction' ? 'Introduction' : 
                 chapterId === 'vectors' ? 'Chapter 1: Vectors' : 
                 'Chapter 2: Forces',
          content: `# ${chapterId === 'introduction' ? 'Introduction' : chapterId === 'vectors' ? 'Vectors' : 'Forces'}

This is the content for the ${chapterId} chapter. In the real implementation, this would be loaded from the processed Nature of Code content.

## What You'll Learn

- Core concepts about ${chapterId}
- How to implement ${chapterId} in p5.js
- Real-world applications

## Let's Get Started

Here's a simple example to demonstrate the concept:`,
          codeBlocks: [
            {
              id: 'example-1',
              language: 'javascript',
              code: `// Example ${chapterId} code
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // Your code here
}`,
              caption: `Basic ${chapterId} example`
            }
          ]
        };
        
        setChapter(mockChapter);
      } catch (err) {
        setError('Failed to load chapter content');
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
      <h1>{chapter.title}</h1>
      
      <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      
      {chapter.codeBlocks.map((block) => (
        <div key={block.id} className="my-8">
          <CodeBlock
            code={block.code}
            language={block.language}
            caption={block.caption}
          />
        </div>
      ))}
    </article>
  );
}