import { cache } from 'react';

export interface Chapter {
  id: string;
  slug: string;
  title: string;
  type: 'chapter' | 'page';
  content: string;
  htmlContent: string;
  codeBlocks: CodeBlock[];
  images: string[];
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  lineNumbers?: boolean;
}

export interface ChapterIndex {
  id: string;
  slug: string;
  title: string;
  type: 'chapter' | 'page';
}

// Cache the results to avoid re-fetching on every request
export const getChapterIndex = cache(async (): Promise<ChapterIndex[]> => {
  try {
    const response = await fetch('/content/index.json');
    const data = await response.json();
    return data.chapters;
  } catch (error) {
    console.error('Failed to load chapter index:', error);
    return [];
  }
});

export const getChapter = cache(async (chapterId: string): Promise<Chapter | null> => {
  try {
    const response = await fetch(`/content/chapters/${chapterId}/content.json`);
    if (!response.ok) {
      throw new Error(`Chapter not found: ${chapterId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to load chapter ${chapterId}:`, error);
    return null;
  }
});

// For server-side loading
export async function getChapterServer(chapterId: string): Promise<Chapter | null> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const contentPath = path.join(
      process.cwd(),
      'app/public/content/chapters',
      chapterId,
      'content.json'
    );
    
    const content = await fs.readFile(contentPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load chapter ${chapterId}:`, error);
    return null;
  }
}

export async function getChapterIndexServer(): Promise<ChapterIndex[]> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const indexPath = path.join(
      process.cwd(),
      'app/public/content/index.json'
    );
    
    const content = await fs.readFile(indexPath, 'utf-8');
    const data = JSON.parse(content);
    return data.chapters;
  } catch (error) {
    console.error('Failed to load chapter index:', error);
    return [];
  }
}