import { readFile, readdir, writeFile } from 'fs/promises';
import { join } from 'path';

interface SearchDocument {
  id: string;
  type: 'chapter' | 'section' | 'code';
  title: string;
  content: string;
  chapterId: string;
  tags: string[];
  url: string;
}

const CONTENT_DIR = '../app/public/content';
const SEARCH_INDEX_FILE = '../app/public/content/search-index.json';

async function buildSearchIndex() {
  console.log('🔍 Building search index...');
  
  const documents: SearchDocument[] = [];
  const chaptersDir = join(CONTENT_DIR, 'chapters');
  
  try {
    const chapterDirs = await readdir(chaptersDir);
    
    for (const chapterId of chapterDirs) {
      const contentFile = join(chaptersDir, chapterId, 'content.json');
      
      try {
        const chapterData = JSON.parse(await readFile(contentFile, 'utf-8'));
        
        // Index chapter
        documents.push({
          id: `chapter-${chapterId}`,
          type: 'chapter',
          title: chapterData.title,
          content: stripHtml(chapterData.content),
          chapterId,
          tags: chapterData.metadata.tags || [],
          url: `/chapters/${chapterId}`,
        });
        
        // Index code blocks
        for (const codeBlock of chapterData.codeBlocks) {
          documents.push({
            id: `code-${chapterId}-${codeBlock.id}`,
            type: 'code',
            title: `Code example from ${chapterData.title}`,
            content: codeBlock.code,
            chapterId,
            tags: ['code', codeBlock.language],
            url: `/chapters/${chapterId}#${codeBlock.id}`,
          });
        }
      } catch (error) {
        console.error(`Error processing chapter ${chapterId}:`, error);
      }
    }
    
    // Create search index with metadata
    const searchIndex = {
      documents,
      metadata: {
        totalDocuments: documents.length,
        lastBuilt: new Date().toISOString(),
        version: '1.0.0',
      },
    };
    
    await writeFile(SEARCH_INDEX_FILE, JSON.stringify(searchIndex, null, 2));
    
    console.log(`✅ Search index built with ${documents.length} documents`);
  } catch (error) {
    console.error('❌ Error building search index:', error);
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Run the indexer
buildSearchIndex().catch(console.error);