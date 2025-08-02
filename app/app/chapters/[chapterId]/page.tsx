import { ChapterContent } from '@/components/book/ChapterContent';

export default function ChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  return <ChapterContent chapterId={params.chapterId} />;
}

// Generate static params for known chapters
export async function generateStaticParams() {
  return [
    { chapterId: 'introduction' },
    { chapterId: 'vectors' },
    { chapterId: 'forces' },
  ];
}