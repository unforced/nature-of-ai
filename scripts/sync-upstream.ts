import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const execAsync = promisify(exec);

interface Chapter {
  id: string;
  title: string;
  content: string;
  htmlContent: string;
  codeBlocks: CodeBlock[];
  metadata: Record<string, any>;
}

interface CodeBlock {
  id: string;
  language: string;
  code: string;
  caption?: string;
  lineNumbers?: boolean;
}

const UPSTREAM_DIR = '../nature-of-code-upstream';
const OUTPUT_DIR = '../app/public/content';
const INDEX_FILE = '../app/public/content/index.json';

async function syncUpstream() {
  console.log('🔄 Syncing upstream Nature of Code repository...');
  
  try {
    // Update submodule
    await execAsync('git submodule update --remote --merge', {
      cwd: process.cwd(),
    });
    console.log('✅ Submodule updated');
  } catch (error) {
    console.error('❌ Failed to update submodule:', error);
    console.log('Continuing with existing content...');
  }

  // Process chapters
  const chapters = await processChapters();
  
  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });
  
  // Save processed chapters
  for (const chapter of chapters) {
    const chapterDir = join(OUTPUT_DIR, 'chapters', chapter.id);
    await mkdir(chapterDir, { recursive: true });
    
    await writeFile(
      join(chapterDir, 'content.json'),
      JSON.stringify(chapter, null, 2)
    );
  }
  
  // Create index
  const index = {
    chapters: chapters.map(ch => ({
      id: ch.id,
      title: ch.title,
      metadata: ch.metadata,
    })),
    lastSync: new Date().toISOString(),
  };
  
  await writeFile(INDEX_FILE, JSON.stringify(index, null, 2));
  
  console.log(`✅ Processed ${chapters.length} chapters`);
  console.log('🎉 Sync complete!');
}

async function processChapters(): Promise<Chapter[]> {
  const chapters: Chapter[] = [];
  const chaptersDir = join(UPSTREAM_DIR, 'content');
  
  try {
    const files = await readdir(chaptersDir);
    const chapterFiles = files
      .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
      .sort();
    
    for (const file of chapterFiles) {
      const chapter = await processChapter(join(chaptersDir, file));
      if (chapter) {
        chapters.push(chapter);
      }
    }
  } catch (error) {
    console.error('Error reading chapters directory:', error);
    console.log('Make sure the upstream submodule is initialized');
  }
  
  return chapters;
}

async function processChapter(filePath: string): Promise<Chapter | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const { data: metadata, content: markdownContent } = matter(content);
    
    // Extract code blocks
    const codeBlocks = extractCodeBlocks(markdownContent);
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(markdownContent);
    
    const id = filePath.split('/').pop()?.replace(/\.(md|mdx)$/, '') || 'unknown';
    
    return {
      id,
      title: metadata.title || 'Untitled Chapter',
      content: markdownContent,
      htmlContent: processedContent.toString(),
      codeBlocks,
      metadata,
    };
  } catch (error) {
    console.error(`Error processing chapter ${filePath}:`, error);
    return null;
  }
}

function extractCodeBlocks(content: string): CodeBlock[] {
  const codeBlocks: CodeBlock[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  let blockId = 0;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const language = match[1] || 'javascript';
    const code = match[2].trim();
    
    // Check for p5.js or Processing code
    if (language === 'javascript' || language === 'js' || language === 'processing') {
      codeBlocks.push({
        id: `code-${blockId++}`,
        language,
        code,
        lineNumbers: code.split('\n').length > 5,
      });
    }
  }
  
  return codeBlocks;
}

// Run the sync
syncUpstream().catch(console.error);