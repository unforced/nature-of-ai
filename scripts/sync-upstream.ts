import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, readFile, writeFile, mkdir, copyFile } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { existsSync } from 'fs';
import { parse } from 'node-html-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const execAsync = promisify(exec);

interface Chapter {
  id: string;
  slug: string;
  title: string;
  type: 'chapter' | 'page';
  content: string;
  htmlContent: string;
  codeBlocks: CodeBlock[];
  images: string[];
}

interface CodeBlock {
  id: string;
  language: string;
  code: string;
  caption?: string;
  lineNumbers?: boolean;
}

const UPSTREAM_DIR = join(__dirname, '../nature-of-code-upstream');
const OUTPUT_DIR = join(__dirname, '../app/public/content');
const INDEX_FILE = join(__dirname, '../app/public/content/index.json');
const CONTENT_JSON = join(UPSTREAM_DIR, 'content/content.json');

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
  await mkdir(join(OUTPUT_DIR, 'chapters'), { recursive: true });
  await mkdir(join(OUTPUT_DIR, 'images'), { recursive: true });
  
  // Save processed chapters
  for (const chapter of chapters) {
    const chapterDir = join(OUTPUT_DIR, 'chapters', chapter.id);
    await mkdir(chapterDir, { recursive: true });
    
    await writeFile(
      join(chapterDir, 'content.json'),
      JSON.stringify(chapter, null, 2)
    );
    
    // Copy images
    for (const imagePath of chapter.images) {
      const sourceImage = join(UPSTREAM_DIR, 'content', imagePath);
      const destImage = join(OUTPUT_DIR, imagePath);
      
      try {
        await mkdir(dirname(destImage), { recursive: true });
        if (existsSync(sourceImage)) {
          await copyFile(sourceImage, destImage);
        }
      } catch (error) {
        console.error(`Failed to copy image ${imagePath}:`, error);
      }
    }
  }
  
  // Create index
  const index = {
    chapters: chapters.map(ch => ({
      id: ch.id,
      slug: ch.slug,
      title: ch.title,
      type: ch.type,
    })),
    lastSync: new Date().toISOString(),
  };
  
  await writeFile(INDEX_FILE, JSON.stringify(index, null, 2));
  
  console.log(`✅ Processed ${chapters.length} chapters`);
  console.log('🎉 Sync complete!');
}

async function processChapters(): Promise<Chapter[]> {
  const chapters: Chapter[] = [];
  
  try {
    // Read the content.json file to get chapter listing
    const contentJsonStr = await readFile(CONTENT_JSON, 'utf-8');
    const contentIndex = JSON.parse(contentJsonStr);
    
    for (const item of contentIndex) {
      const chapter = await processChapter(item);
      if (chapter) {
        chapters.push(chapter);
      }
    }
  } catch (error) {
    console.error('Error processing chapters:', error);
    console.log('Make sure the upstream submodule is initialized');
  }
  
  return chapters;
}

async function processChapter(item: any): Promise<Chapter | null> {
  try {
    const filePath = join(UPSTREAM_DIR, 'content', item.src.replace('./', ''));
    const htmlContent = await readFile(filePath, 'utf-8');
    
    // Parse HTML
    const root = parse(htmlContent);
    
    // Extract text content
    const textContent = root.text;
    
    // Extract code blocks
    const codeBlocks = extractCodeBlocksFromHtml(root);
    
    // Extract images (this also updates image paths in the HTML)
    const images = extractImages(root);
    
    // Get the modified HTML with updated image paths
    const modifiedHtml = root.toString();
    
    return {
      id: item.slug,
      slug: item.slug,
      title: item.title,
      type: item.type,
      content: textContent,
      htmlContent: modifiedHtml,
      codeBlocks,
      images,
    };
  } catch (error) {
    console.error(`Error processing chapter ${item.title}:`, error);
    return null;
  }
}

function extractCodeBlocksFromHtml(root: any): CodeBlock[] {
  const codeBlocks: CodeBlock[] = [];
  const codeElements = root.querySelectorAll('pre[data-code-language]');
  
  codeElements.forEach((element: any, index: number) => {
    const language = element.getAttribute('data-code-language') || 'javascript';
    const code = element.text.trim();
    
    codeBlocks.push({
      id: `code-${index}`,
      language,
      code,
      lineNumbers: code.split('\n').length > 5,
    });
  });
  
  return codeBlocks;
}

function extractImages(root: any): string[] {
  const images: string[] = [];
  const imgElements = root.querySelectorAll('img');
  
  imgElements.forEach((img: any) => {
    let src = img.getAttribute('src');
    if (src) {
      // Update image src to use /content/ prefix
      if (!src.startsWith('http') && !src.startsWith('/')) {
        img.setAttribute('src', `/content/${src}`);
      } else if (src.startsWith('/')) {
        img.setAttribute('src', `/content${src}`);
      }
      images.push(src);
    }
  });
  
  return images;
}

// Run the sync
syncUpstream().catch(console.error);